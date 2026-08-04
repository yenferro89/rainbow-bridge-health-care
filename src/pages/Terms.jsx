import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Ph from "../components/Ph.jsx";
import { site, contact, fullAddress, legalUpdated } from "../config/site.js";

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
            Effective <Ph>{legalUpdated}</Ph>
          </p>

          <div className="legal__flag">
            <strong>Counsel must review this before launch.</strong> It is a
            complete draft, not legal advice, and it has not been reviewed by an
            attorney.
          </div>

          <h2>Who we are</h2>
          <p>
            This website is operated by {site.legalName}, {fullAddress()}. By
            using it you agree to these terms. If you do not agree, please do not
            use the site.
          </p>

          <h2>This site is not medical advice</h2>
          <p>
            Everything here is general information about the services we offer.
            It is not medical advice, does not create a caregiver or provider
            relationship, and must never be used to decide about a medical
            emergency.{" "}
            <strong>If someone is in danger, call 911.</strong>
          </p>

          <h2>Enquiries and service requests</h2>
          <p>
            Submitting the request form does not create a contract for services
            and does not guarantee availability. Care begins only after an
            assessment, a signed service agreement, and confirmation of payment
            or authorisation arrangements. We may decline a request where we
            cannot safely meet the person's needs, where the address falls
            outside the counties we serve, or where staffing does not allow it.
          </p>

          <h2>Information you give us</h2>
          <p>
            You agree that the information you submit is accurate, and that where
            you are enquiring on behalf of another person you have the authority
            to do so. Do not submit protected health information through the
            form — see our <Link to="/privacy">Privacy &amp; HIPAA notice</Link>{" "}
            for how we handle what you send.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not use this site to break the law, to interfere with its
            operation or security, to scrape or harvest it by automated means, or
            to submit anything false, abusive or infringing.
          </p>

          <h2>Accuracy and availability</h2>
          <p>
            We keep licence numbers, service descriptions, service areas and
            hours current, but they can change and the site may occasionally be
            unavailable. Call us to confirm anything you intend to rely on. The
            site is provided on an "as is" and "as available" basis, without
            warranties of any kind to the fullest extent the law allows.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by Florida law, {site.legalName} is
            not liable for indirect, incidental or consequential damages arising
            from your use of this website. Nothing in these terms limits
            liability that cannot lawfully be limited, and nothing here affects
            the obligations we owe you under a signed service agreement.
          </p>

          <h2>Third-party links and services</h2>
          <p>
            This site links to and embeds services we do not control, including
            Google Maps and our contact form provider. We are not responsible for
            their content or their practices, and their own terms and privacy
            policies apply.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The Rainbow Bridge Health Care name, logo, text, photographs and the
            design of this site belong to {site.legalName} or are licensed to it,
            and may not be reproduced without permission. Photographs on this site
            are licensed stock images; the people shown are models and are not
            clients or staff.
          </p>

          <h2>Accessibility</h2>
          <p>
            We build this site to be usable with a keyboard, with a screen
            reader, and with motion reduced. See our{" "}
            <Link to="/accessibility">accessibility statement</Link> for what we
            aim for and how to tell us when we fall short.
          </p>

          <h2>Non-discrimination</h2>
          <p>
            We provide care without discrimination. See our{" "}
            <Link to="/non-discrimination">non-discrimination notice</Link>.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms. The effective date above shows when they
            last changed, and continuing to use the site means you accept the
            current version.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Florida, without
            regard to its conflict of laws rules. Any dispute will be brought in
            the state or federal courts located in{" "}
            <Ph>[COUNTY — ordinarily Orange County]</Ph>, Florida.
          </p>

          <h2>Contact</h2>
          <p>
            {site.legalName}
            <br />
            {fullAddress()}
            <br />
            <a href={contact.phoneHref}>{contact.phone}</a> ·{" "}
            <a href={contact.emailHref}>{contact.email}</a>
          </p>
        </div>
      </article>
    </>
  );
}
