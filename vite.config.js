import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * GitHub Pages serves this from a subpath (/rainbow-bridge-health-care/) unless
 * a custom domain is attached. Set BASE_PATH=/ when moving to a real domain.
 */
const base = process.env.BASE_PATH ?? "/rainbow-bridge-health-care/";

/**
 * GitHub Pages has no server-side rewrite, so a hard refresh on /contact would
 * 404. Serving the same document as 404.html hands the URL back to the router
 * with the address bar intact.
 */
function githubPagesSpaFallback() {
  return {
    name: "gh-pages-spa-fallback",
    closeBundle() {
      const index = resolve("dist/index.html");
      if (existsSync(index)) copyFileSync(index, resolve("dist/404.html"));
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), githubPagesSpaFallback()],
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
