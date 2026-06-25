// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	site: "https://www.ocelescope.org",
	integrations: [
		starlight({
			title: "Ocelescope",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/promi4s/ocelescope",
				},
			],
			components: {
				Header: "./src/components/starlight/Header.astro",
				SiteTitle: "./src/components/starlight/SiteTitle.astro",
			},
			sidebar: [
				{
					label: "Getting Started",
					slug: "getting-started",
				},
				{
					label: "Download",
					items: [{ label: "Download Ocelescope", slug: "download" }],
				},
				{
					label: "Documentation",
					items: [{ label: "Overview", slug: "documentation" }],
				},
				{
					label: "Plugins",
					items: [
						{ label: "Overview", slug: "plugins" },
						{ label: "Available Plugins", slug: "plugins/available-plugins" },
						{ label: "Example Plugins", slug: "plugins/example-plugins" },
						{ label: "Submit a Plugin", slug: "plugins/submit-plugin" },
					],
				},

				{
					label: "User Guide",
					items: [
						{ label: "Overview", slug: "user-guide" },
						{ label: "Log Overview", slug: "user-guide/log-overview" },
						{ label: "Filtering", slug: "user-guide/filtering" },
						{
							label: "Importing and Exporting",
							slug: "user-guide/importing-exporting",
						},
						{
							label: "Running Plugin Methods",
							slug: "user-guide/running-plugin-methods",
						},
						{
							label: "Results and Visualizations",
							slug: "user-guide/results-and-visualizations",
						},
					],
				},
				{
					label: "Plugin Development",
					items: [
						{ label: "Overview", slug: "plugin-development" },
						{
							label: "Plugin Structure",
							slug: "plugin-development/plugin-structure",
						},
						{ label: "Plugin Class", slug: "plugin-development/plugin-class" },
						{ label: "Resources", slug: "plugin-development/resources" },
						{ label: "Extensions", slug: "plugin-development/extensions" },
						{
							label: "Plugin Environment",
							slug: "plugin-development/environment",
						},
						{
							label: "Build and Package",
							slug: "plugin-development/build-and-package",
						},
						{
							label: "Tutorial: OCEL Graph",
							slug: "plugin-development/tutorial-ocel-graph",
						},
					],
				},
				{
					label: "Developer Guide",
					items: [
						{ label: "Overview", slug: "developer-guide" },
						{ label: "Architecture", slug: "developer-guide/architecture" },
						{ label: "Backend", slug: "developer-guide/backend" },
						{ label: "Frontend", slug: "developer-guide/frontend" },
						{ label: "Reference", slug: "developer-guide/reference" },
						{
							label: "Local Development",
							slug: "developer-guide/local-development",
						},
					],
				},
				{
					label: "API References",
					items: [{ autogenerate: { directory: "api-references" } }],
				},
				{
					label: "Community",
					items: [
						{ label: "Overview", slug: "community" },
						{ label: "Report a Bug", slug: "community/report-bug" },
						{ label: "Request a Feature", slug: "community/request-feature" },
						{
							label: "Request a Dependency",
							slug: "community/request-dependency",
						},
					],
				},
			],
		}),
	],
});
