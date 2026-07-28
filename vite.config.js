import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * GitHub Pages serves this from a subpath (/rainbow-bridge-health-care/) unless
 * a custom domain is attached. Set BASE_PATH=/ when moving to a real domain.
 */
const base = process.env.BASE_PATH ?? "/rainbow-bridge-health-care/";

/** Client routes that need a real file on disk. Keep in step with App.jsx. */
const ROUTES = ["contact", "services", "about", "privacy", "terms"];

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
