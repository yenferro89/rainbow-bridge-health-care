import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import Ph from "../components/Ph.jsx";
import { contact } from "../config/site.js";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <Hero
        compact
        eyebrow="404"
        title="That page isn't"
        accent="here."
        lede="The link may be old, or we may have moved something. Whatever you were looking for, the fastest way to it is usually a phone call."
        actions={
          <>
            <Link to="/contact" className="btn btn--primary">
              Go to contact
            </Link>
            <a href={contact.phoneHref} className="btn btn--ghost">
              Call <Ph>{contact.phone}</Ph>
            </a>
          </>
        }
      />
    </>
  );
}
