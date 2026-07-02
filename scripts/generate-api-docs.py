#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["griffe>=1.0"]
# ///
"""Generate Starlight API reference pages from the ocelescope Python source.

This mirrors what mkdocstrings does for the ocelescope repo's own docs site,
but renders plain Markdown for Starlight instead of building a mkdocs site.
Run only in CI against a checkout of github.com/promi4s/ocelescope; never
required for local website development.

Usage:
    generate-api-docs.py <path-to-ocelescope-checkout> <output-dir>
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path

import griffe

# (output path relative to <output-dir>, page title, [dotted module paths])
PAGES: list[tuple[str, str, list[str]]] = [
    ("ocel/core", "OCEL", ["ocelescope.ocel.core.ocel", "ocelescope.ocel.models.meta"]),
    ("ocel/extensions", "Extensions", ["ocelescope.ocel.extensions"]),
    ("ocel/filters", "Filters", ["ocelescope.ocel.filter"]),
    ("ocel/managers/objects", "Objects Manager", ["ocelescope.ocel.managers.objects"]),
    ("ocel/managers/events", "Events Manager", ["ocelescope.ocel.managers.events"]),
    ("ocel/managers/e2o", "E2O Manager", ["ocelescope.ocel.managers.e2o"]),
    ("ocel/managers/o2o", "O2O Manager", ["ocelescope.ocel.managers.o2o"]),
    ("ocel/models/relations", "Relation Models", ["ocelescope.ocel.models.relations"]),
    ("plugins/index", "Plugins", ["ocelescope.plugin"]),
    ("discovery/index", "Discovery", ["ocelescope.discovery"]),
    ("resources/index", "Resource", ["ocelescope.resource.resource"]),
    ("resources/base/petri-net", "Petri Net", ["ocelescope.resource.default.petri_net"]),
    (
        "resources/base/directly-follows-graph",
        "Directly-Follows Graph",
        ["ocelescope.resource.default.dfg"],
    ),
    (
        "resources/visualizations/index",
        "Visualization",
        ["ocelescope.visualization.visualization"],
    ),
    ("resources/visualizations/plotly", "Plotly", ["ocelescope.visualization.default.plotly"]),
    ("resources/visualizations/svg", "SVG", ["ocelescope.visualization.default.svg"]),
    ("resources/visualizations/dot", "Dot (Graphviz)", ["ocelescope.visualization.default.dot"]),
    ("resources/visualizations/table", "Table", ["ocelescope.visualization.default.table"]),
    ("resources/visualizations/graph", "Graph", ["ocelescope.visualization.default.graph"]),
]


@dataclass
class Ctx:
    loader: griffe.GriffeLoader
    src_root: Path


def public_export_order(mod: griffe.Module) -> list[str]:
    # When a module declares __all__, that's the explicit public API (mkdocstrings
    # honors it even for re-exported aliases). Without one, only show members
    # actually defined here -- imported names are typically documented on their
    # own source module's page instead.
    if mod.exports:
        return [str(name) for name in mod.exports if name in mod.members]
    return [
        name
        for name, member in mod.members.items()
        if not name.startswith("_") and not isinstance(member, griffe.Alias)
    ]


def render_docstring(obj: griffe.Object, level: int) -> str:
    if not obj.docstring:
        return ""
    out: list[str] = []
    for section in obj.docstring.parse(griffe.Parser.google):
        kind = section.kind.value
        if kind == "text":
            out.append(section.value.strip())
        elif kind == "parameters":
            bullets = []
            for p in section.value:
                ann = f" `{p.annotation}`" if p.annotation else ""
                desc = f" — {p.description.strip()}" if p.description else ""
                bullets.append(f"- **`{p.name}`**{ann}{desc}")
            out.append("**Parameters:**\n" + "\n".join(bullets))
        elif kind == "returns":
            bullets = []
            for r in section.value:
                ann = f" `{r.annotation}`" if r.annotation else ""
                desc = f" — {r.description.strip()}" if r.description else ""
                bullets.append(f"-{ann}{desc}")
            out.append("**Returns:**\n" + "\n".join(bullets))
        elif kind == "raises":
            bullets = []
            for r in section.value:
                ann = f" `{r.annotation}`" if r.annotation else ""
                desc = f" — {r.description.strip()}" if r.description else ""
                bullets.append(f"-{ann}{desc}")
            out.append("**Raises:**\n" + "\n".join(bullets))
        elif kind == "attributes":
            bullets = []
            for a in section.value:
                ann = f" `{a.annotation}`" if a.annotation else ""
                desc = f" — {a.description.strip()}" if a.description else ""
                bullets.append(f"- **`{a.name}`**{ann}{desc}")
            out.append("**Attributes:**\n" + "\n".join(bullets))
        elif kind == "examples":
            for _, text in section.value:
                out.append(text.strip())
    return "\n\n".join(part for part in out if part.strip())


def render_signature(obj: griffe.Object) -> str:
    if obj.kind.value == "class":
        bases = ", ".join(str(b) for b in obj.bases)
        return f"class {obj.name}({bases}):" if bases else f"class {obj.name}:"
    params = [p for p in obj.parameters if p.name != "self"]
    parts = []
    for p in params:
        ann = f": {p.annotation}" if p.annotation else ""
        default = f" = {p.default}" if p.default is not None else ""
        parts.append(f"{p.name}{ann}{default}")
    returns = f" -> {obj.returns}" if obj.returns else ""
    prefix = "async def" if "async" in obj.labels else "def"
    return f"{prefix} {obj.name}({', '.join(parts)}){returns}:"


def read_source(obj: griffe.Object) -> str | None:
    if not obj.lineno or not obj.endlineno or not obj.filepath:
        return None
    try:
        lines = Path(obj.filepath).read_text().splitlines()
    except OSError:
        return None
    return "\n".join(lines[obj.lineno - 1 : obj.endlineno])


def render_member(obj: griffe.Object, name: str, level: int, lines: list[str], is_root: bool = False) -> None:
    if name.startswith("_") and name != "__init__":
        return
    # Mirrors the upstream site's show_if_no_docstring: false -- members with no
    # docstring of their own (plain attribute assignments, synthesized __init__,
    # etc.) are already covered by the class's own "Attributes:" section. The
    # page's root entries are always shown since they were explicitly requested,
    # even if undocumented (e.g. pydantic filter classes with no class docstring).
    if not obj.docstring and not is_root:
        return

    heading = "#" * level
    kind_label = {"class": "class", "function": "function"}.get(obj.kind.value, "")
    if "property" in obj.labels:
        kind_label = "property"
    label = f"*{kind_label}*" if kind_label else ""
    lines.append(f"{heading} {label} `{name}`".strip())

    if obj.kind.value in ("class", "function"):
        lines.append(f"```python\n{render_signature(obj)}\n```")

    doc = render_docstring(obj, level)
    if doc:
        lines.append(doc)

    source = read_source(obj)
    if source:
        lines.append(f"<details>\n<summary>Source</summary>\n\n```python\n{source}\n```\n\n</details>")

    if obj.kind.value == "class":
        for member_name, member in obj.members.items():
            if member_name.startswith("_") and member_name != "__init__":
                continue
            if member.kind.value not in ("function", "attribute"):
                continue
            if member.kind.value == "attribute":
                render_attribute(member, member_name, level + 1, lines)
            else:
                render_member(member, member_name, level + 1, lines)


def render_attribute(obj: griffe.Object, name: str, level: int, lines: list[str], is_root: bool = False) -> None:
    if not obj.docstring and not is_root:
        return
    heading = "#" * level
    ann = f": {obj.annotation}" if getattr(obj, "annotation", None) else ""
    default = f" = {obj.value}" if getattr(obj, "value", None) is not None else ""
    lines.append(f"{heading} *attribute* `{name}`")
    lines.append(f"```python\n{name}{ann}{default}\n```")
    doc = render_docstring(obj, level)
    if doc:
        lines.append(doc)


def render_module(dotted: str, ctx: Ctx, lines: list[str]) -> None:
    try:
        mod = ctx.loader.load(dotted)
    except Exception as exc:  # noqa: BLE001 - ocelescope's module layout can drift
        print(f"warning: skipping {dotted} ({exc})", file=sys.stderr)
        return
    for name in public_export_order(mod):
        member = mod.members[name]
        if member.kind.value not in ("class", "function", "attribute"):
            continue
        if member.kind.value == "attribute":
            render_attribute(member, name, 2, lines, is_root=True)
        else:
            render_member(member, name, 2, lines, is_root=True)


def main() -> None:
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)

    checkout = Path(sys.argv[1]).resolve()
    output_dir = Path(sys.argv[2]).resolve()
    src_root = checkout / "src" / "ocelescope" / "src"
    if not src_root.is_dir():
        print(f"error: expected ocelescope source at {src_root}", file=sys.stderr)
        sys.exit(1)

    loader = griffe.GriffeLoader(
        search_paths=[str(src_root)],
        docstring_parser=griffe.Parser.google,
    )
    ctx = Ctx(loader=loader, src_root=src_root)

    for rel_path, title, modules in PAGES:
        lines: list[str] = []
        for dotted in modules:
            render_module(dotted, ctx, lines)

        if not lines:
            print(f"warning: no content for {rel_path}, skipping", file=sys.stderr)
            continue

        body = "\n\n".join(lines)
        frontmatter = f'---\ntitle: "{title}"\n---\n\n'
        target = output_dir / f"{rel_path}.md"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(frontmatter + body + "\n")
        print(f"wrote {target}")


if __name__ == "__main__":
    main()
