import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import AstroPWA from "@vite-pwa/astro";

const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const isStandalone = env.STANDALONE === "true";
const site = process.env.SITE_URL ?? "https://nellowtcs.me";

export default defineConfig({
  site: `${site}/learnerportfolio`,
  base: process.env.BASE_URL ?? "/learnerportfolio/",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },

  vite: {
    define: {
      __APP_VERSION__: JSON.stringify(
        process.env.npm_package_version ?? "0.0.0",
      ),
    },
  },

  integrations: [
    !isStandalone &&
      AstroPWA({
        registerType: "autoUpdate",
        includeAssets: ["robots.txt"],
        pwaAssets: {
          image: "public/favicon.png",
          preset: "minimal-2023",
        },
        manifest: {
          name: "IB English 11 Learner Portfolio",
          short_name: "Learner Portfolio",
          start_url: "./",
          display: "standalone",
          theme_color: "#00bfff",
          background_color: "#00bfff",
          description:
            "My IB English 11 learner portfolio: notes, devices, and writing artifacts.",
        },
        workbox: {
          globPatterns: [
            "**/*.{js,css,html,svg,png,ico,txt,webmanifest}",
          ],
          navigateFallback: `${process.env.BASE_URL ?? "/learnerportfolio/"}404`,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/.*\.(css|js|woff2?)$/i,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "app-shell",
              },
            },
          ],
        },
      }),
  ].filter(Boolean),
});