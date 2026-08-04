import { settings } from "../config/site.js";

/** A value is still unfilled if it carries [SQUARE BRACKETS] anywhere inside. */
const BRACKETED = /\[[^\]]+\]/;

function isUnfilled(node) {
  if (typeof node === "string") return BRACKETED.test(node);
  if (Array.isArray(node)) return node.some(isUnfilled);
  if (node && typeof node === "object" && node.props) {
    return isUnfilled(node.props.children);
  }
  return false;
}

/**
 * Wraps a value that may still need replacing with real business information.
 * While settings.highlightPlaceholders is true, any value still carrying
 * [BRACKETS] is visibly marked, so nothing ships as "[(407) 555-0100]" by
 * accident.
 *
 * Values the client has since supplied render plain. Highlighting a real
 * address makes the marker meaningless — once everything glows, nothing reads
 * as outstanding.
 */
export default function Ph({ children }) {
  if (!settings.highlightPlaceholders || !isUnfilled(children)) {
    return <>{children}</>;
  }
  return (
    <span className="ph" title="Placeholder — replace in src/config/site.js">
      {children}
    </span>
  );
}
