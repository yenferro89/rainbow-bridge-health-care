import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import ContactForm from "../components/ContactForm.jsx";
import ProofStrip from "../components/ProofStrip.jsx";
import Ph from "../components/Ph.jsx";
import AnimatedContent from "../reactbits/AnimatedContent.jsx";
import { contact, credentials, fullAddress } from "../config/site.js";
import { useReducedMotion } from "../lib/useReducedMotion.js";

export default function Contact() {
  const reduced = useReducedMotion();
  const Reveal = reduced ? Passthrough : AnimatedContent;

  return (
    <>
      <Seo
        title="Contact"
        description="Talk to the Rainbow Bridge care team about in-home care for your loved one. We reply within one business day."
      />

      <Hero
        compact
        eyebrow="Contact"
        title="You don't have to figure this out"
        accent="alone."
        lede="Tell us what's happening at home. We'll listen, explain your options in plain language, and tell you honestly whether we're the right fit for your family."
        actions={
          <>
            <a href={contact.phoneHref} className="btn btn--primary">
              Call <Ph>{contact.phone}</Ph>
            </a>
            <a href="#send-a-message" className="btn btn--ghost">
              Send a message instead
            </a>
          </>
        }
      />

      <section className="band band--twilight">
        <div className="shell">
          <ProofStrip />
        </div>
      </section>

      <div className="crossing" aria-hidden="true" />

      <section className="band band--daylight" id="send-a-message">
        <div className="shell">
          <div className="contact-grid">
            <div>
              <div className="section-head">
                <p className="eyebrow section-head__eyebrow">Start here</p>
                {/* OPEN (Q5): the client struck the old heading but only
                    "…your loved one" was legible above the page break, so the
                    replacement wording is still to come. */}
                <h2 className="display section-head__title">
                  Request service
                </h2>
              </div>
              <ContactForm />
            </div>

            <Reveal distance={40} duration={0.9} threshold={0.15} delay={0.1}>
              <aside className="details" aria-label="Ways to reach us">
                <div className="urgent">
                  <p className="urgent__title">Need someone today?</p>
                  <p className="urgent__body">
                    If a discharge is imminent or a caregiver has fallen
                    through, call rather than write. Someone picks up.
                  </p>
                  <a className="urgent__phone" href={contact.phoneHref}>
                    <Ph>{contact.phone}</Ph>
                  </a>
                  <p className="urgent__body">
                    After hours:{" "}
                    <a href={contact.afterHoursPhoneHref}>
                      <Ph>{contact.afterHoursPhone}</Ph>
                    </a>
                  </p>
                </div>

                <div className="detail">
                  <p className="detail__label">Phone</p>
                  <div className="hours">
                    <div className="hours__row">
                      <span className="hours__day">Office</span>
                      <span className="hours__time">
                        <a href={contact.phoneHref}>{contact.phone}</a>
                      </span>
                    </div>
                    <div className="hours__row">
                      <span className="hours__day">Mobile — text or call</span>
                      <span className="hours__time">
                        <a href={contact.mobilePhoneHref}>{contact.mobilePhone}</a>
                      </span>
                    </div>
                    <div className="hours__row">
                      <span className="hours__day">eFax</span>
                      <span className="hours__time">{contact.eFax}</span>
                    </div>
                  </div>
                </div>

                <div className="detail">
                  <p className="detail__label">Email</p>
                  <p className="detail__value">
                    <a href={contact.emailHref}>
                      <Ph>{contact.email}</Ph>
                    </a>
                  </p>
                  <p className="detail__meta">
                    Replies within one business day, always from a person.
                  </p>
                </div>

                <div className="detail">
                  <p className="detail__label">Office</p>
                  <p className="detail__value">
                    <Ph>{contact.address.street}</Ph>
                    <br />
                    <Ph>
                      {contact.address.city}, {contact.address.state}{" "}
                      {contact.address.zip}
                    </Ph>
                  </p>
                  <p className="detail__meta">
                    Visits by appointment — the care itself happens in your home.
                  </p>
                </div>

                <div className="detail">
                  <p className="detail__label">Hours</p>
                  <div className="hours">
                    {contact.hours.map((h) => (
                      <div
                        className={`hours__row${
                          h.emphasis ? " hours__row--emphasis" : ""
                        }`}
                        key={h.day}
                      >
                        <span className="hours__day">{h.day}</span>
                        <span className="hours__time">
                          <Ph>{h.time}</Ph>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail">
                  <p className="detail__label">Licensed &amp; accredited</p>
                  <div className="hours">
                    {credentials.map((c) => (
                      <div className="hours__row" key={c.label}>
                        <span className="hours__day">{c.label}</span>
                        <span className="hours__time">
                          <Ph>{c.value}</Ph>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--vapor">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">Find us</p>
            <h2 className="display section-head__title">
              <Ph>{contact.address.city}</Ph>, and the homes around it
            </h2>
            <p className="section-head__lede">
              Our office is where the paperwork happens. The care happens where
              your family already lives.
            </p>
          </div>

          <div className="map">
            {contact.mapEmbedSrc ? (
              <iframe
                src={contact.mapEmbedSrc}
                title={`Map showing ${fullAddress()}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map__placeholder">
                <strong>Map placeholder</strong>
                <span>
                  Paste a Google Maps embed URL into <code>contact.mapEmbedSrc</code>{" "}
                  in <code>src/config/site.js</code>.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/** Used in place of AnimatedContent when the visitor asked for less motion. */
function Passthrough({ children }) {
  return <>{children}</>;
}
