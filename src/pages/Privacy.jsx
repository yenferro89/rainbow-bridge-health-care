import Seo from "../components/Seo.jsx";
import Ph from "../components/Ph.jsx";
import { site, contact, fullAddress, legalUpdated } from "../config/site.js";

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy & HIPAA notice"
        description={`How ${site.legalName} collects, uses and protects your information, and your rights over it.`}
      />

      <article className="legal">
        <div className="shell shell--narrow">
          <p className="eyebrow" style={{ color: "var(--sky)" }}>
            Legal
          </p>
          <h1 className="display legal__title">Privacy &amp; HIPAA notice</h1>
          <p className="legal__meta">
            Effective <Ph>{legalUpdated}</Ph>
          </p>

          <div className="legal__flag">
            <strong>Counsel must review and sign this off before launch.</strong>{" "}
            It is a complete draft covering the content a Notice of Privacy
            Practices is required to carry under 45 CFR §164.520, written for a
            Florida in-home care agency. It is not legal advice, it has not been
            reviewed by an attorney, and two things still need confirming: that
            the agency is a HIPAA covered entity, and who is named as Privacy
            Officer.
          </div>

          <p className="legal__callout">
            THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED
            AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE
            REVIEW IT CAREFULLY.
          </p>

          <h2>Who this notice covers</h2>
          <p>
            This notice describes how {site.legalName} may use and disclose your
            protected health information (PHI), and how you can get access to
            that information. It applies to care delivered by our staff in your
            home, and to information you give us through this website. All of our
            employees, contracted caregivers and business associates are required
            to follow it.
          </p>

          <h2>Information we collect from this website</h2>
          <p>
            When you submit the request form we receive the client's name and
            date of birth, the parent or legal guardian's name, the service
            address including county, your phone number and email address if you
            give one, the services you have selected, the days and times you are
            requesting, and any comments you add. This is transmitted to and
            stored by Brevo, our contact management provider, and is used to
            respond to your enquiry and arrange care.
          </p>
          <p>
            <strong>
              The request form is not a secure channel for medical information.
            </strong>{" "}
            Please do not send diagnoses, medication lists or record numbers
            through it. Information you volunteer there is handled with care but
            does not travel under the safeguards that apply once you become a
            client.
          </p>

          <h2>How we may use and disclose your health information</h2>
          <p>
            <strong>For treatment.</strong> We use your health information to
            provide and coordinate your care. A caregiver may be told about your
            mobility, dietary needs or routines so they can support you safely.
            We may share information with your physician, a home health agency,
            a hospital discharge planner or another provider involved in your
            care.
          </p>
          <p>
            <strong>For payment.</strong> We may use and disclose your
            information to bill and receive payment from Medicaid, a Medicaid
            waiver program, long-term care insurance, another insurer, or a
            person responsible for your account, including confirming coverage
            and obtaining prior authorisation.
          </p>
          <p>
            <strong>For health care operations.</strong> We may use your
            information to run the agency — supervising caregivers, assessing
            quality of care, training staff, arranging audits, and general
            administrative activities.
          </p>
          <p>
            <strong>To people involved in your care.</strong> Unless you object,
            we may share information relevant to their involvement with a family
            member, guardian, or another person you identify.
          </p>
          <p>
            <strong>Appointment and service reminders.</strong> We may contact
            you to confirm or change a scheduled visit.
          </p>

          <h2>Uses and disclosures permitted or required without your authorisation</h2>
          <p>
            We may use or disclose your information without your authorisation
            when the law requires or permits it, including: as required by
            federal, state or local law; for public health activities such as
            reporting disease or product recalls; to report suspected abuse,
            neglect or exploitation of a child or vulnerable adult; for health
            oversight activities including licensure surveys, audits and
            investigations; in response to a court order, subpoena or other
            lawful process; to law enforcement in the limited circumstances the
            law allows; to a coroner, medical examiner or funeral director; for
            organ or tissue donation; for approved research; to avert a serious
            and imminent threat to health or safety; for specified government
            functions including military and national security; and as
            authorised by workers' compensation law.
          </p>

          <h2>Uses that always require your written authorisation</h2>
          <p>
            We will not use or disclose your information for marketing, will not
            sell it, and will not disclose psychotherapy notes, without your
            written authorisation. You may revoke an authorisation in writing at
            any time, and we will stop, except where we have already acted in
            reliance on it.
          </p>

          <h2>Your rights</h2>
          <p>
            <strong>To inspect and copy.</strong> You may inspect and obtain a
            copy of the health information we use to make decisions about your
            care, including an electronic copy where we hold it electronically.
            We may charge a reasonable, cost-based fee.
          </p>
          <p>
            <strong>To request an amendment.</strong> If you believe information
            we hold is incorrect or incomplete, you may ask us to amend it. We
            may deny the request in certain circumstances, and will tell you why
            in writing.
          </p>
          <p>
            <strong>To an accounting of disclosures.</strong> You may request a
            list of the disclosures we have made of your information, other than
            those for treatment, payment and health care operations and certain
            others the law excludes.
          </p>
          <p>
            <strong>To request restrictions.</strong> You may ask us to limit
            how we use or disclose your information. We are not required to
            agree, except that we must agree to withhold information from a
            health plan where you have paid for that service in full yourself.
          </p>
          <p>
            <strong>To confidential communications.</strong> You may ask us to
            contact you in a particular way or at a particular address. We will
            accommodate reasonable requests.
          </p>
          <p>
            <strong>To a paper copy of this notice.</strong> You may ask for one
            at any time, even if you agreed to receive it electronically.
          </p>
          <p>
            <strong>To be notified of a breach.</strong> We will tell you if a
            breach compromises the privacy or security of your information.
          </p>

          <h2>Our duties</h2>
          <p>
            We are required by law to protect the privacy of your health
            information, to give you this notice describing our legal duties and
            privacy practices, and to follow the terms of the notice currently in
            effect. We reserve the right to change this notice and to make the
            new terms apply to information we already hold. A revised notice will
            be posted on this page and made available at our office.
          </p>

          <h2>Cookies, analytics and third parties</h2>
          <p>
            This site sets no advertising or tracking cookies and runs no
            third-party analytics. Two third parties receive limited data as a
            consequence of how the site is built: Google Fonts receives your IP
            address when fonts are requested, and Google Maps receives it when
            the map on the contact page loads. Submitting the request form sends
            what you entered to Brevo. Each of these operates under its own
            privacy policy.
          </p>
          <p>
            <Ph>
              [If analytics, advertising pixels or a chat widget are added later,
              this section must be updated and a cookie consent mechanism may be
              required.]
            </Ph>
          </p>

          <h2>Complaints</h2>
          <p>
            If you believe your privacy rights have been violated you may file a
            complaint with us using the details below, or with the Secretary of
            the U.S. Department of Health and Human Services, Office for Civil
            Rights. <strong>We will not retaliate against you for filing a
            complaint.</strong>
          </p>

          <h2>Contact</h2>
          <p>
            Privacy Officer: <Ph>[NAME]</Ph>
            <br />
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
