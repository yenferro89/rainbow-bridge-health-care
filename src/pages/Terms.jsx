import Seo from "../components/Seo.jsx";
import Ph from "../components/Ph.jsx";
import { site, contact } from "../config/site.js";

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of use"
        description={`Terms governing use of the ${site.legalName} website.`}
      />

      <article className="legal">
        <div className="shell shell--narrow">
          <p className="eyebrow" style={{ color: "var(--sky)" }}>
            Legal
          </p>
          <h1 className="display legal__title">Terms of use</h1>
          <p className="legal__meta">
            Last updated <Ph>[DATE]</Ph>
          </p>

          <div className="legal__flag">
            <strong>Have counsel review this before launch.</strong> The
            sections below are a reasonable starting structure, not legal
            advice.
          </div>

          <h2>Using this site</h2>
          <p>
            This website is operated by <Ph>{site.legalName}</Ph>. By using it
            you agree to these terms. If you do not agree, please do not use the
            site.
          </p>

          <h2>This site is not medical advice</h2>
          <p>
            Everything here is general information about the services we offer.
            It is not medical advice, does not create a caregiver relationship,
            and should never be used to decide about a medical emergency.{" "}
            <strong>If someone is in danger, call 911.</strong>
          </p>

          <h2>Enquiries</h2>
          <p>
            Submitting the contact form does not create a contract for services
            and does not guarantee availability. Care begins only after an
            assessment, a signed service agreement, and confirmation of payment
            arrangements.
          </p>

          <h2>Accuracy</h2>
          <p>
            We keep licence numbers, service descriptions and hours current, but
            they can change. Call us to confirm anything you intend to rely on.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The Rainbow Bridge Health Care name, logo and the contents of this
            site belong to <Ph>{site.legalName}</Ph> and may not be reproduced
            without permission.
          </p>

          <h2>Accessibility</h2>
          <p>
            We build this site to be usable with a keyboard, with a screen
            reader, and with motion reduced. If something here gets in your way,
            tell us at{" "}
            <a href={contact.emailHref}>
              <Ph>{contact.email}</Ph>
            </a>{" "}
            and we will fix it and help you directly in the meantime.
          </p>

          <h2>Governing law</h2>
          <p>
            <Ph>[Counsel to complete — ordinarily the State of Florida.]</Ph>
          </p>
        </div>
      </article>
    </>
  );
}
