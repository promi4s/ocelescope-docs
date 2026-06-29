#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# ///
"""Generate the plugin-environment package list from the ocelescope source.

The Plugin Environment docs page lists the third-party packages a plugin can
rely on, with their version constraints. Those come from the `ocelescope`
package's own dependencies plus its `plugin` extra, so this script reads
`<checkout>/src/ocelescope/pyproject.toml` and writes a small JSON file the
website renders into a table. Run in CI against a checkout of
github.com/promi4s/ocelescope; the committed JSON is the fallback used for
local development.

Usage:
    generate-plugin-packages.py <path-to-ocelescope-checkout> <output-json>
"""

from __future__ import annotations

import json
import re
import sys
import tomllib
from pathlib import Path

# name, optional [extras], then the version specifier (everything else).
_REQ = re.compile(r"^([A-Za-z0-9._-]+)(?:\[[^\]]*\])?(.*)$")


def parse_requirement(req: str) -> dict[str, str]:
    """Split a PEP 508 requirement into a name and version specifier.

    Extras (e.g. `r4pm[polars]`) are dropped; only the distribution name and
    its version constraint are kept, since that is what the docs table shows.
    """
    match = _REQ.match(req.strip())
    if not match:
        raise ValueError(f"could not parse requirement: {req!r}")
    name, version = match.group(1), match.group(2).strip()
    return {"name": name, "version": version}


def main() -> None:
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)

    checkout = Path(sys.argv[1]).resolve()
    output = Path(sys.argv[2]).resolve()
    pyproject = checkout / "src" / "ocelescope" / "pyproject.toml"
    if not pyproject.is_file():
        print(f"error: expected ocelescope pyproject at {pyproject}", file=sys.stderr)
        sys.exit(1)

    data = tomllib.loads(pyproject.read_text())
    project = data["project"]

    core = [parse_requirement(r) for r in project.get("dependencies", [])]
    plugin = [
        parse_requirement(r)
        for r in project.get("optional-dependencies", {}).get("plugin", [])
    ]

    core.sort(key=lambda p: p["name"].lower())
    plugin.sort(key=lambda p: p["name"].lower())

    result = {
        "ocelescopeVersion": project.get("version", ""),
        "core": core,
        "plugin": plugin,
    }

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2) + "\n")
    print(f"wrote {output} ({len(core)} core, {len(plugin)} plugin packages)")


if __name__ == "__main__":
    main()
