// Catalog of the modules that make up the current Ocelescope system.
// Rendered as cards by src/components/ModuleLibrary.astro and surfaced on the
// Module Library docs page. To add a module, drop a preview PNG into
// src/assets/moduleLibrary/ and append an entry here — nothing else to touch.

/** Where a package/source link points, used to pick its chip icon. */
export type ModuleLinkKind = "npm" | "pypi" | "github";

export interface ModuleLink {
	kind: ModuleLinkKind;
	/** Role of the link, e.g. "Frontend package", "Backend source". */
	label: string;
	/** Shown as inline code on the chip, e.g. "@ocelescope/filter". */
	name: string;
	href: string;
}

export interface Module {
	name: string;
	/** Basename of the preview image in src/assets/moduleLibrary/ (no extension). */
	image: string;
	/** Main copy. May contain inline HTML anchors. */
	description: string;
	/** Optional muted footnote below the copy. May contain inline HTML anchors. */
	note?: string;
	/** Optional pill in the card header, e.g. "Bundled". */
	badge?: string;
	/** Where the module's code lives; rendered as a link beside the title. */
	source: ModuleLink;
	/** Published packages, rendered as chips below the copy. */
	links: ModuleLink[];
}

const REPO = "https://github.com/promi4s/ocelescope";

/** The shared source link — every module lives in the monorepo. */
const source: ModuleLink = {
	kind: "github",
	label: "Source",
	name: "promi4s/ocelescope",
	href: REPO,
};

export const modules: Module[] = [
	{
		name: "Management",
		image: "management",
		description:
			"Manage OCELs and resources: upload logs, inspect them, and organize the resources derived from them.",
		badge: "Minimal",
		source,
		links: [
			{
				kind: "npm",
				label: "Frontend package",
				name: "@ocelescope/management",
				href: "https://www.npmjs.com/package/@ocelescope/management",
			},
		],
	},
	{
		name: "Log Overview",
		image: "overview",
		description:
			"A high-level summary of OCELs, including its key statistics and structure at a glance.",
		source,
		links: [
			{
				kind: "npm",
				label: "Frontend package",
				name: "@ocelescope/log-overview",
				href: "https://www.npmjs.com/package/@ocelescope/log-overview",
			},
		],
	},
	{
		name: "Discovery",
		image: "discovery",
		description:
			"Process discovery: derive and visualize process models from OCELs.",
		source,
		links: [
			{
				kind: "npm",
				label: "Frontend package",
				name: "@ocelescope/discovery",
				href: "https://www.npmjs.com/package/@ocelescope/discovery",
			},
		],
	},
	{
		name: "Filter",
		image: "filter",
		description:
			"Filter uploaded OCELs. Every other view then works on the filtered version of the log until the filter is removed.",
		source,
		links: [
			{
				kind: "npm",
				label: "Frontend package",
				name: "@ocelescope/filter",
				href: "https://www.npmjs.com/package/@ocelescope/filter",
			},
			{
				kind: "pypi",
				label: "Backend package",
				name: "ocelescope-module-filter",
				href: "https://pypi.org/project/ocelescope-module-filter/",
			},
		],
  },
  {
		name: "Variants",
		image: "variants",
		description:
			"Inspeact case-centric variants and export them as XES.",
		source,
		links: [
			{
				kind: "npm",
				label: "Frontend package",
				name: "@ocelescope/variants",
				href: "https://www.npmjs.com/package/@ocelescope/variants",
			},
		],
	},
	{
		name: "Plugin",
		image: "plugin",
		description:
			'Plugin runner: run installed <a href="/ocelescope/plugins/">plugins</a> through their generated forms and view their results.',
		source,
		links: [
			{
				kind: "npm",
				label: "Frontend package",
				name: "@ocelescope/plugin",
				href: "https://www.npmjs.com/package/@ocelescope/plugin",
			},
		],
	},
	{
		name: "Ocelot",
		image: "ocelot",
		description:
			'An Ocelescope adaptation of the <a href="https://ocelot.pm/">Ocelot</a> tool for interactively exploring how individual events and objects relate, searching entities, and visualizing their relationships as a graph.',
		badge: "Bundled",
		source,
		links: [
			{
				kind: "npm",
				label: "Frontend package",
				name: "@ocelescope/ocelot",
				href: "https://www.npmjs.com/package/@ocelescope/ocelot",
			},
			{
				kind: "pypi",
				label: "Backend package",
				name: "ocelescope-module-ocelot",
				href: "https://pypi.org/project/ocelescope-module-ocelot/",
			},
		],
	},
];
