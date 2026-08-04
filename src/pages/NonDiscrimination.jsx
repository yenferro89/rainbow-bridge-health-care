import Seo from "../components/Seo.jsx";
import Ph from "../components/Ph.jsx";
import { site, contact, fullAddress, legalUpdated } from "../config/site.js";

export default function NonDiscrimination() {
  return (
    <>
      <Seo
        title="Non-discrimination notice"
        description={`${site.legalName} provides care without discrimination, and provides language assistance free of charge.`}
      />

      <article className="legal">
        <div className="shell shell--narrow">
          <p className="eyebrow" style={{ color: "var(--sky)" }}>
            Legal
          </p>
          <h1 className="display legal__title">Non-discrimination notice</h1>
          <p className="legal__meta">
            Effective <Ph>{legalUpdated}</Ph>
          </p>

          <div className="legal__flag">
            <strong>Counsel must review this before launch.</strong> Section 1557
            of the Affordable Care Act applies to providers receiving federal
            financial assistance, which ordinarily includes Medicaid
            reimbursement, and it carries specific notice and language-assistance
            requirements. Counsel should confirm that it applies here and that
            this wording satisfies it.
          </div>

          <h2>Our policy</h2>
          <p>
            {site.legalName} complies with applicable federal civil rights laws
            and does not discriminate on the basis of race, colour, national
            origin, age, disability, sex, sexual orientation, gender identity,
            religion or marital status. We do not exclude people or treat them
            differently for any of those reasons.
          </p>

          <h2>Help for people with disabilities</h2>
          <p>
            We provide free aids and services to people with disabilities to
            communicate effectively with us, including qualified sign language
            interpreters and written information in other formats such as large
            print. Ask us and we will arrange it.
          </p>

          <h2>Help in other languages</h2>
          <p>
            We provide free language services to people whose primary language is
            not English, including qualified interpreters and information written
            in other languages. Many of the families we serve are more
            comfortable in Spanish, and we make sure that is never the reason a
            conversation goes badly.
          </p>
          <p className="legal__callout">
            ATENCIÓN: si habla español, tiene a su disposición servicios
            gratuitos de asistencia lingüística. Llame al{" "}
            <a href={contact.phoneHref}>{contact.phone}</a>.
          </p>
          <p>
            <Ph>
              [Counsel to confirm which additional languages require a tagline
              here. Section 1557 has historically keyed this to the top languages
              spoken by people with limited English proficiency in the state.]
            </Ph>
          </p>

          <h2>If you believe we have discriminated</h2>
          <p>
            You may file a grievance with us in person, by post, by phone or by
            email using the details below. If you need help filing one, we will
            help you.
          </p>
          <p>
            Civil Rights Coordinator: <Ph>[NAME]</Ph>
            <br />
            {site.legalName}
            <br />
            {fullAddress()}
            <br />
            <a href={contact.phoneHref}>{contact.phone}</a> ·{" "}
            <a href={contact.emailHref}>{contact.email}</a>
          </p>

          <h2>Filing with the federal government</h2>
          <p>
            You may also file a civil rights complaint with the U.S. Department
            of Health and Human Services, Office for Civil Rights, electronically
            through its Complaint Portal at{" "}
            <a
              href="https://ocrportal.hhs.gov/ocr/portal/lobby.jsf"
              target="_blank"
              rel="noopener noreferrer"
            >
              ocrportal.hhs.gov
            </a>
            , or by post or phone at: U.S. Department of Health and Human
            Services, 200 Independence Avenue SW, Room 509F, HHH Building,
            Washington, DC 20201 — 1-800-368-1019 (TDD 1-800-537-7697).
          </p>
        </div>
      </article>
    </>
  );
}
