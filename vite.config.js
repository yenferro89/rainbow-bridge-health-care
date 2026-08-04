import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * GitHub Pages serves this from a subpath (/rainbow-bridge-health-care/) unless
 * a custom domain is attached. Set BASE_PATH=/ when moving to a real domain.
 */
const base = process.env.BASE_PATH ?? "/rainbow-bridge-health-care/";

/**
 * Client routes that need a real file on disk. Keep in step with App.jsx.
 * The county pages are the SEO surface, so a hard-landed visit from Google
 * must answer 200 rather than fall through to the 404 catch-all.
 */
const COUNTY_SLUGS = [
  "orange-county",
  "osceola-county",
  "seminole-county",
  "brevard-county",
];

const SERVICE_SLUGS = [
  "personal-care",
  "homemaker-companion",
  "pcs-under-21",
  "personal-support",
  "life-skills-development",
  "respite",
];

const ROUTES = [
  "contact",
  "services",
  "about",
  "privacy",
  "terms",
  "accessibility",
  "non-discrimination",
  "service-areas",
  ...COUNTY_SLUGS.map((s) => `service-areas/${s}`),
  ...SERVICE_SLUGS.map((s) => `services/${s}`),
];

/**
 * GitHub Pages has no server-side rewrite, so a hard refresh on /contact would
 * 404. Two things happen here.
 *
 * `404.html` is the catch-all: GitHub serves it for any unmatched path with
 * the address bar intact, so the router still gets the URL.
 *
 * That alone works, but it answers with a 404 status — and the contact page is
 * the one page this site exists for. So each known route also gets a real
 * `<route>/index.html`, which GitHub serves as a 200.
 */
function githubPagesRoutes() {
  return {
    name: "gh-pages-routes",
    closeBundle() {
      const index = resolve("dist/index.html");
      if (!existsSync(index)) return;

      copyFileSync(index, resolve("dist/404.html"));

      // sitemap.xml and robots.txt are generated from ROUTES above rather than
      // maintained by hand, so they cannot drift from the pages that exist.
      const origin = (process.env.SITE_ORIGIN ?? "https://yenferro89.github.io").replace(/\/$/, "");
      const prefix = `${origin}${base}`.replace(/\/$/, "");
      const urls = ["", ...ROUTES]
        .map((r) => {
          // Landing pages first, deeper pages slightly lower.
          const priority = r === "" ? "1.0" : r.includes("/") ? "0.7" : "0.8";
          return `  <url>\n    <loc>${prefix}/${r}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join("\n");

      writeFileSync(
        resolve("dist/sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );

      writeFileSync(
        resolve("dist/robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${prefix}/sitemap.xml\n`
      );

      for (const route of ROUTES) {
        const dir = resolve(`dist/${route}`);
        mkdirSync(dir, { recursive: true });
        copyFileSync(index, resolve(dir, "index.html"));
      }
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), githubPagesRoutes()],
  build: {
    target: "es2020",
    cssTarget: "safari15",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
