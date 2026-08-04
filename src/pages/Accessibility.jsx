import Seo from "../components/Seo.jsx";
import Ph from "../components/Ph.jsx";
import { site, contact, legalUpdated } from "../config/site.js";

export default function Accessibility() {
  return (
    <>
      <Seo
        title="Accessibility statement"
        description={`How ${site.legalName} builds this site to be usable by everyone, and how to tell us when it isn't.`}
      />

      <article className="legal">
        <div className="shell shell--narrow">
          <p className="eyebrow" style={{ color: "var(--sky)" }}>
            Legal
          </p>
          <h1 className="display legal__title">Accessibility statement</h1>
          <p className="legal__meta">
            Effective <Ph>{legalUpdated}</Ph>
          </p>

          <div className="legal__flag">
            <strong>Counsel should review this before launch.</strong> It
            describes what the site actually does today rather than making a
            conformance claim we have not formally audited — that distinction
            matters, and an attorney should confirm the wording.
          </div>

          <h2>Our commitment</h2>
          <p>
            Many of the people who need this site are older, are managing a
            disability, or are reading it late at night while worried. If the
            site is hard to use, it has failed at the only thing it exists to do.
            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1
            at Level AA.
          </p>
          <p>
            <strong>We have not commissioned a formal third-party audit.</strong>{" "}
            We are describing the standard we build to and test against, not
            certifying conformance.
          </p>

          <h2>What the site does today</h2>
          <ul className="legal__list">
            <li>
              Every interactive element can be reached and operated with a
              keyboard, and focus is always visible.
            </li>
            <li>
              A skip link lets keyboard and screen reader users jump straight
              past the navigation to the main content.
            </li>
            <li>
              Headings run in a real order, form fields have real labels, and
              errors are announced rather than only shown in colour.
            </li>
            <li>
              Photographs carry descriptive alternative text. Decorative graphics
              are hidden from screen readers.
            </li>
            <li>
              Text and interface colours are chosen against WCAG AA contrast
              minimums.
            </li>
            <li>
              Every animation on the site respects{" "}
              <code>prefers-reduced-motion</code>. If your device is set to
              reduce motion, the parallax, reveals and tilts do not run and the
              content is shown directly.
            </li>
            <li>
              The layout reflows to a single column on small screens, and text
              can be enlarged without content being lost.
            </li>
          </ul>

          <h2>Known limitations</h2>
          <ul className="legal__list">
            <li>
              The map on the contact page is embedded from Google Maps. We do not
              control its accessibility. Our full address is written out beside
              it in text so the map is never the only way to get it.
            </li>
            <li>
              Fonts are loaded from Google Fonts. If that request fails the site
              falls back to system fonts, which changes the appearance but not
              the content.
            </li>
            <li>
              We have not yet tested with every combination of browser and
              assistive technology.
            </li>
          </ul>

          <h2>Tell us when we get it wrong</h2>
          <p>
            If any part of this site gets in your way, tell us and we will fix
            it. We will also help you directly in the meantime — anything you can
            do on this site, we can do with you on the phone, and we will not ask
            you to use the website to get care.
          </p>
          <p>
            <a href={contact.emailHref}>{contact.email}</a>
            <br />
            <a href={contact.phoneHref}>{contact.phone}</a> (office) ·{" "}
            <a href={contact.mobilePhoneHref}>{contact.mobilePhone}</a> (text or
            call)
          </p>
          <p>
            We aim to respond within one business day and to tell you plainly
            what we can fix and when.
          </p>
        </div>
      </article>
    </>
  );
}
