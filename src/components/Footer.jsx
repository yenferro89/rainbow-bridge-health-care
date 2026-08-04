import { Link } from "react-router-dom";
import {
  site,
  contact,
  credentials,
  services,
  counties,
  fullAddress,
} from "../config/site.js";
import { asset } from "../lib/asset.js";
import Ph from "./Ph.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div>
            <img
              className="footer__logo"
              src={asset("img/logo-420.png")}
              width="420"
              height="252"
              alt={site.legalName}
              loading="lazy"
            />
            <p className="footer__blurb">{site.tagline}.</p>
            <p className="footer__blurb" style={{ marginTop: "1rem" }}>
              <Ph>{fullAddress()}</Ph>
            </p>
            <ul className="footer__list" style={{ marginTop: "0.8rem" }}>
              {counties.map((c) => (
                <li key={c.slug}>
                  <Link to={`/service-areas/${c.slug}`}>
                    In-home care in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Care at home</h2>
            <ul className="footer__list">
              {services.slice(0, 5).map((s) => (
                <li key={s.name}>
                  <Link to="/services">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Reach us</h2>
            <ul className="footer__list">
              <li>
                <a href={contact.phoneHref}>
                  <Ph>{contact.phone}</Ph>
                </a>{" "}
                <span style={{ color: "var(--on-dark-faint)" }}>Office</span>
              </li>
              <li>
                <a href={contact.mobilePhoneHref}>
                  <Ph>{contact.mobilePhone}</Ph>
                </a>{" "}
                <span style={{ color: "var(--on-dark-faint)" }}>Text or call</span>
              </li>
              <li style={{ color: "var(--on-dark-faint)" }}>eFax {contact.eFax}</li>
              <li>
                <a href={contact.emailHref}>
                  <Ph>{contact.email}</Ph>
                </a>
              </li>
              <li>
                <Link to="/contact">Request a consultation</Link>
              </li>
            </ul>

            <h2 className="footer__heading" style={{ marginTop: "2rem" }}>
              Licensed &amp; accredited
            </h2>
            <ul className="footer__list">
              {credentials.map((c) => (
                <li key={c.label} style={{ color: "var(--on-dark-faint)" }}>
                  {c.label}: <Ph>{c.value}</Ph>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <nav className="footer__legal" aria-label="Legal">
            <Link to="/privacy">Privacy &amp; HIPAA notice</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/accessibility">Accessibility</Link>
            <Link to="/non-discrimination">Non-discrimination</Link>
            <a href="#main">Back to top</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
