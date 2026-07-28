import { settings } from "../config/site.js";

/**
 * Wraps a value that still needs replacing with real business information.
 * While settings.highlightPlaceholders is true these are visibly marked, so
 * nothing ships as "[(407) 555-0100]" by accident.
 */
export default function Ph({ children }) {
  if (!settings.highlightPlaceholders) return <>{children}</>;
  return (
    <span className="ph" title="Placeholder — replace in src/config/site.js">
      {children}
    </span>
  );
}
