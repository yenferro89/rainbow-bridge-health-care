import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../config/site.js";

/**
 * Keeps <link rel="canonical"> in step with the route.
 *
 * This is a client-rendered SPA, so every route serves the same HTML shell and
 * Google can otherwise treat near-identical shells as duplicates. The county
 * and service pages are the ones at risk — they share layout and differ mainly
 * in copy — so each needs to name itself as the canonical URL.
 */
export default function Canonical() {
  const { pathname } = useLocation();

  useEffect(() => {
    // site.url has no trailing slash; the router path always starts with one.
    const clean = pathname.replace(/\/+$/, "") || "/";
    const href = clean === "/" ? `${site.url}/` : `${site.url}${clean}`;

    let tag = document.querySelector('link[rel="canonical"]');
    if (!tag) {
      tag = document.createElement("link");
      tag.setAttribute("rel", "canonical");
      document.head.appendChild(tag);
    }
    tag.setAttribute("href", href);

    let og = document.querySelector('meta[property="og:url"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:url");
      document.head.appendChild(og);
    }
    og.setAttribute("content", href);
  }, [pathname]);

  return null;
}
