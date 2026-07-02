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
			customCss: ["./src/styles/global.css"],
			sidebar: [
				{
					label: "Getting Started",
					items: [
						{
							label: "Introduction and Demo",
							slug: "getting-started/ocelescope-introduction",
						},
						{
							label: "Start Ocelescope",
							slug: "getting-started/download",
						},
						{
							label: "Explore the Basics",
							slug: "getting-started/explore-first-ocel",
						},
						{
							label: "Loading Plugins",
							slug: "getting-started/loading-plugins",
						},
						{
							label: "Loading Modules",
							slug: "getting-started/loading-modules",
						},
					],
				},
				{
					label: "Community",
					items: [
						{ label: "Plugin Library", slug: "community/plugin-library" },
						{ label: "Submit a Plugin", slug: "community/submit-plugin" },
						{ label: "Report a Bug", slug: "community/report-bug" },
						{ label: "Request a Feature", slug: "community/request-feature" },
						{ label: "Troubleshooting", slug: "community/troubleshooting" },
					],
				},
				{
					label: "Ocelescope",
					items: [
						{ label: "Structure", slug: "ocelescope/structure" },
						{ label: "Base Tool", slug: "ocelescope/base-tool" },
						{ label: "Plugins", slug: "ocelescope/plugins" },
						{ label: "Modules", slug: "ocelescope/modules" },
						{ label: "Resources", slug: "ocelescope/resources" },
						{ label: "Extensions", slug: "ocelescope/extensions" },
						{
							label: "Ocelescope Library",
							slug: "ocelescope/ocelescope-library",
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
						{
							label: "Plugin Environment",
							slug: "plugin-development/environment",
						},
						{
							label: "Build and Package",
							slug: "plugin-development/build-and-package",
						},
						{
							label: "Tutorial: Plugin Development",
							slug: "plugin-development/tutorial-plugin-development",
						},
						{
							label: "Request additional package",
							slug: "plugin-development/request-package",
						},
					],
				},
				/* {
					label: "Module Development",
					items: [
						{ label: "Overview", slug: "module-development" },
						{
							label: "Module Structure",
							slug: "module-development/module-structure",
						},
						{
							label: "Backend Module",
							slug: "module-development/backend-module",
						},
						{
							label: "Frontend Module",
							slug: "module-development/frontend-module",
						},
						{
							label: "Register a Module",
							slug: "module-development/register-module",
						},
					],
				}, */
				{
					label: "API References",
					items: [{ autogenerate: { directory: "api-references" } }],
				},
			],
		}),
	],
});
