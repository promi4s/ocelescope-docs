// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
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
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Overview", slug: "getting-started" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "First Log", slug: "getting-started/first-log" },
            {
              label: "Loading Plugins",
              slug: "getting-started/loading-plugins",
            },
            {
              label: "Troubleshooting",
              slug: "getting-started/troubleshooting",
            },
          ],
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
              label: "Create a Plugin",
              slug: "plugin-development/create-plugin",
            },
            {
              label: "Plugin Structure",
              slug: "plugin-development/plugin-structure",
            },
            { label: "Functions", slug: "plugin-development/functions" },
            { label: "Resources", slug: "plugin-development/resources" },
            { label: "Extensions", slug: "plugin-development/extensions" },
            {
              label: "Build and Package",
              slug: "plugin-development/build-and-package",
            },
            {
              label: "Tutorial: OCEL Graph",
              slug: "plugin-development/tutorial-ocel-graph",
            },
            {
              label: "API Reference",
              slug: "plugin-development/api-reference",
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
