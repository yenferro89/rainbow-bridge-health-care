import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import ProofStrip from "../components/ProofStrip.jsx";
import Ph from "../components/Ph.jsx";
import AnimatedContent from "../reactbits/AnimatedContent.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import { site } from "../config/site.js";

/**
 * Vision and Mission sit in the same hairline grid as the services, carrying
 * two bands of the spectrum. Reusing that idiom rather than inventing a card
 * block keeps the page in the site's own language.
 */
function Statements() {
  const reduced = useReducedMotion();

  const items = (
    <ul className="services" style={{ "--service-cols": 2, "--service-cols-sm": 2 }}>
      <li className="service" style={{ "--service-band": "var(--band-sky)" }}>
        <h2 className="service__name">Our Vision</h2>
        <p className="service__body">
          To redefine home and community care by creating a future where every
          individual is empowered to thrive, every family feels supported, and
          exceptional care becomes the standard — not the exception.
        </p>
      </li>

      <li className="service" style={{ "--service-band": "var(--band-violet)" }}>
        <h2 className="service__name">Our Mission</h2>
        <p className="service__body">
          We deliver personalized care that goes beyond daily support. By
          building meaningful relationships, promoting independence, and
          embracing each person's unique abilities, we create experiences that
          inspire confidence, enrich lives, and strengthen the communities we
          serve.
        </p>
      </li>
    </ul>
  );

  if (reduced) return items;

  return (
    <AnimatedContent distance={40} duration={0.9} threshold={0.25}>
      {items}
    </AnimatedContent>
  );
}

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description={`${site.legalName} — who we are and how we work with families across Central Florida.`}
      />

      <Hero
        compact
        eyebrow="About"
        title="We make a difference in caring for your loved"
        accent="one."
        lede="That line has been on our logo since the beginning. This page is where we show our work on it."
      />

      <div className="crossing" aria-hidden="true" />

      <section className="band band--daylight">
        <div className="shell shell--narrow">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">Our story</p>
            <h2 className="display section-head__title">
              Why we started this
            </h2>
          </div>

          <p className="prose">
            Every person has a unique journey, and every family deserves a
            trusted partner along the way. Our agency was founded with a simple
            belief: exceptional care is not just about meeting needs — it's
            about building relationships, creating opportunities for
            independence, and making every interaction meaningful. We are
            committed to delivering personalized support that empowers
            individuals to live with confidence, dignity, and purpose in the
            place they call home.
          </p>
        </div>
      </section>

      <section className="band band--vapor">
        <div className="shell">
          <Statements />
        </div>
      </section>

      <section className="band band--vapor">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">By the numbers</p>
            <h2 className="display section-head__title">Where we are today</h2>
          </div>
          <ProofStrip />
          <p style={{ marginTop: "3rem" }}>
            <Link to="/contact" className="btn btn--primary">
              Start a conversation
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
