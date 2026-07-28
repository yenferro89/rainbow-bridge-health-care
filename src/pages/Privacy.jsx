import Seo from "../components/Seo.jsx";
import Ph from "../components/Ph.jsx";
import { site, contact, fullAddress } from "../config/site.js";

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy & HIPAA notice"
        description={`How ${site.legalName} collects, uses and protects your information.`}
      />

      <article className="legal">
        <div className="shell shell--narrow">
          <p className="eyebrow" style={{ color: "var(--sky)" }}>
            Legal
          </p>
          <h1 className="display legal__title">Privacy &amp; HIPAA notice</h1>
          <p className="legal__meta">
            Last updated <Ph>[DATE]</Ph>
          </p>

          <div className="legal__flag">
            <strong>This document needs a lawyer before it goes live.</strong> It
            is a structurally complete starting point covering the sections a
            Florida home care agency is expected to address, but a Notice of
            Privacy Practices carries statutory content requirements under 45
            CFR §164.520 and state law. Have counsel review and complete every
            bracketed section.
          </div>

          <h2>Who this notice covers</h2>
          <p>
            This notice describes how <Ph>{site.legalName}</Ph> may use and
            disclose your protected health information, and how you can get
            access to that information. It applies to care delivered by our
            staff and to information you give us through this website.
          </p>

          <h2>Information we collect from this website</h2>
          <p>
            When you submit the contact form we receive the name, email address,
            phone number, preferred contact method and message you provide, plus
            the answers you select about the type and urgency of care you are
            seeking. This information is transmitted to and stored by Brevo, our
            email and contact management provider, and is used solely to respond
            to your enquiry and to arrange care.
          </p>
          <p>
            <strong>The contact form is not a secure channel for medical
            information.</strong> We ask you not to send diagnoses, medication
            lists, record numbers or other protected health information through
            it. Information you volunteer there is handled with care but is not
            transmitted under the safeguards that apply once you become a
            client.
          </p>

          <h2>How we use protected health information</h2>
          <p>
            <Ph>
              [Counsel to complete: treatment, payment and health care
              operations; disclosures requiring authorisation; disclosures
              permitted without authorisation, including those required by law,
              public health activities, abuse or neglect reporting, health
              oversight, judicial proceedings, and serious threats to health or
              safety.]
            </Ph>
          </p>

          <h2>Your rights</h2>
          <p>
            <Ph>
              [Counsel to complete: right to inspect and copy, right to amend,
              right to an accounting of disclosures, right to request
              restrictions, right to request confidential communications, right
              to a paper copy of this notice, and right to be notified of a
              breach.]
            </Ph>
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This site sets no advertising or tracking cookies and runs no
            third-party analytics. Fonts are served by Google Fonts, which
            receives your IP address as part of that request.{" "}
            <Ph>
              [If you later add analytics, advertising pixels or a chat widget,
              this section must be updated and a cookie consent mechanism may be
              required.]
            </Ph>
          </p>

          <h2>Complaints</h2>
          <p>
            If you believe your privacy rights have been violated you may file a
            complaint with us, or with the Secretary of the U.S. Department of
            Health and Human Services. We will not retaliate against you for
            filing a complaint.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy Officer: <Ph>[NAME]</Ph>
            <br />
            <Ph>{site.legalName}</Ph>
            <br />
            <Ph>{fullAddress()}</Ph>
            <br />
            <a href={contact.phoneHref}>
              <Ph>{contact.phone}</Ph>
            </a>{" "}
            ·{" "}
            <a href={contact.emailHref}>
              <Ph>{contact.email}</Ph>
            </a>
          </p>
        </div>
      </article>
    </>
  );
}
