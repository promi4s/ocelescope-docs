import { plugins } from "./plugins";

export const landing = {
	meta: {
		title: "Ocelescope - Object-Centric Process Mining",
		description:
			"An extensible web framework for object-centric process mining with OCEL 2.0 logs, filtering, discovery, and plugins.",
	},
	brand: {
		name: "Ocelescope",
		homeHref: "/",
		homeLabel: "Ocelescope home",
	},
	hero: {
		eyebrow: "// OBJECT-CENTRIC PROCESS MINING",
		title: "An extensible web framework for object-centric process mining.",
		titlePrefix: "An extensible web framework for",
		titleAccent: "object-centric process mining.",
		body: "Upload an OCEL, filter it down, discover models, and extend everything with plugins. Spin it up with Docker and analyze in minutes - entirely in your browser.",
		primaryCta: { label: "Get started", href: "#quickstart" },
		secondaryCta: { label: "Documentation", href: "/documentation/" },
		trustLabel: "Project details",
		trust: ["Open source", "Runs locally", "Docker", "RWTH PADS"],
	},
	terminal: {
		title: "bash",
		intro: "# two commands and you are running",
		lines: [
			{
				prompt: "$",
				text: "curl -LO https://www.ocelescope.org/docker-compose.yaml",
			},
			{ prompt: "$", text: "docker compose up -d" },
			{ text: "ok backend ghcr.io/promi4s/ocelescope-backend", muted: true },
			{ text: "ok frontend http://localhost:3000", muted: true },
			{ text: "Ocelescope is ready.", accent: true },
		],
	},
	context: {
		label: "Platform capabilities",
		items: [
			"OCEL 2.0",
			"PM4PY-compatible",
			"Plugin library",
			"Custom React modules",
			"Self-hosted",
		],
	},
	features: [
		{
			id: "features",
			eyebrow: "LOG OVERVIEW",
			title: "Understand any OCEL at a glance.",
			body: "Upload a log and Ocelescope profiles it instantly: events and objects, every type, attribute value ranges and the time span they cover. Know what you are working with before you write a single query.",
			tags: [
				"events",
				"objects",
				"object & event types",
				"value ranges",
				"time ranges",
			],
          media: {
            url: "localhost:3000/logOverview",
            caption: "log-overview",
            src: "/assets/videos/log-overview.mp4",
          },
          layout: "text-media",
          tone: "light",
        },
		{
			eyebrow: "FILTER CONSTRUCTOR",
			title: "Get the perspective you need.",
			body: "Compose filters visually to shrink an OCEL. Stack conditions across object and event types, attribute values, time windows and the existence of O2O or E2O relations - then carry the reduced log straight into discovery.",
			tags: [
				"object type & activity selection",
				"attribute-value conditions",
				"time range windows",
				"O2O & E2O existence filters",
			],
          media: {
            url: "localhost:3000/filter",
            caption: "filter constructor",
            src: "/assets/videos/filter-constructor.mp4",
          },
          layout: "media-text",
          tone: "alt",
        },
		{
			id: "discovery",
			eyebrow: "DISCOVERY",
			title: "Discover models - and add your own methods.",
			body: "Out of the box, the discovery tab renders object-centric Petri nets and directly-follows graphs. Need a different algorithm? Define it plugin-style, upload the zip, and it appears as a selectable method right in the tab.",
			tags: ["OC Petri nets", "directly-follows graphs", "+ your method"],
			addableTagIndex: 2,
			media: {
				url: "localhost:3000/discovery",
				caption: "discovery",
				src: "/assets/videos/discovery.mp4",
			},
			layout: "text-media",
			tone: "light",
		},
	],
	statement: {
		eyebrow: "WHY OCELESCOPE",
		titlePrefix: "Ocelescope is where research code",
		accent: "becomes reusable software.",
		body: "Ocelescope provides a plugin system to integrate new functionality at runtime. " +
			"A method should not disappear into a one-off prototype for publication. " +
			"Package it, upload it, run it - and let others build on it.",
	},
	pluginBuilder: {
		eyebrow: "BUILD A PLUGIN",
		title: "Declare your parameters. Ocelescope renders the UI.",
		body: "No frontend work. Type your plugin inputs in Python and the form on the right is generated for you.",
		guide: { label: "Read the plugin guide", href: "/plugin-development/" },
		tutorial: {
			label: "Follow the tutorial",
			href: "/plugin-development/tutorial-ocel-graph/",
		},
		media: {
			url: "localhost:3000/plugin/ocel-graph",
			caption: "auto-generated plugin UI",
			src: "/assets/videos/plugin-creation.mp4",
		},
	},
	customModule: {
		eyebrow: "EXTENSIBLE UI",
		title: "When a form is not enough, ship a full module.",
		body: "Each plugin gets a generated page. For richer workflows, custom React modules mount as first-class views. This way, the OCELOT module was integrated.",
		tags: ["per-plugin pages", "custom React modules", "Ocelot module"],
		accentTagIndex: 2,
        media: {
          url: "localhost:3000/modules/ocelot",
          caption: "OCELOT module",
          src: "/assets/videos/custom-module.mp4",
        },
	},
	plugins,
	ecosystem: {
		eyebrow: "PLUGIN ECOSYSTEM",
		title: "A growing library of analyses.",
        browse: {
          label: "Browse all plugins",
          href: "/plugins/available-plugins/",
        },
		submit: {
			label: "Submit your plugin",
			href: "https://github.com/promi4s/ocelescope/issues/new?template=plugin-submission.yml",
		},
		cardCta: "Download",
	},
	resourcesHeading: {
		eyebrow: "RESOURCES",
		title: "Everything to get unstuck.",
	},
	resourceGroups: [
		{
			label: "Documentation",
			items: [
				{
					kicker: "START",
					title: "Get started guide",
					description: "Install Ocelescope and load your first OCEL log.",
					href: "/getting-started/",
				},
				{
					kicker: "PLUGINS",
					title: "Plugin guide",
					description: "Build, package, and load reusable analysis methods.",
					href: "/plugin-development/",
				},
			],
		},
		{
			label: "GitHub",
			items: [
				{
					kicker: "SUBMIT",
					title: "Submit a plugin",
					description: "Share a plugin with the Ocelescope ecosystem.",
					href: "https://github.com/promi4s/ocelescope/issues/new?template=plugin-submission.yml",
				},
				{
					kicker: "PACKAGES",
					title: "Request an environment package",
					description:
						"Ask for a Python package to be added to the plugin execution environment.",
					href: "https://github.com/promi4s/ocelescope/issues/new?template=plugin-package-request.yml",
				},
				{
					kicker: "ISSUES",
					title: "Report an issue",
					description: "Open a focused bug report with reproduction details.",
					href: "https://github.com/promi4s/ocelescope/issues/new?template=bug-report.yml",
				},
				{
					kicker: "IDEAS",
					title: "Request a feature",
					description: "Suggest improvements for the framework or docs.",
					href: "https://github.com/promi4s/ocelescope/issues/new?template=feature-request.yml",
				},
				{
					kicker: "SOURCE",
					title: "GitHub & troubleshooting",
					description: "Browse the source code and project activity.",
					href: "https://github.com/promi4s/ocelescope",
				},
			],
		},
	],
	quickstart: {
		eyebrow: "GET STARTED",
		title: "Running in two commands.",
		body: "Download the compose file, start the stack, and open the frontend on localhost.",
		primaryCta: {
			label: "Step-by-Step Guide",
			href: "/download/",
		},
		secondaryCta: { label: "Download compose file", href: "/docker-compose.yaml" },
	},
	footer: {
		brandBody: "An extensible web framework for object-centric process mining.",
		copyright: "Ocelescope",
		credit: "Made by RWTH PADS",
	},
};
