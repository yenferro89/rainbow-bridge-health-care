import { useEffect } from "react";
import { site } from "../config/site.js";

/** Keeps the document title and meta description in step with the route. */
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.name;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
