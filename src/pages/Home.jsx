import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import ServiceGrid from "../components/ServiceGrid.jsx";
import ProofStrip from "../components/ProofStrip.jsx";
import ScrollReveal from "../reactbits/ScrollReveal.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";

const THESIS =
  "A rainbow is what happens when light passes through water and comes out in order. That is the work: taking a week that feels like nothing but noise and handing it back to you arranged, so you know what happens next.";

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <>
      <Seo
        title="In-home care for the people you love"
        description="Personal care, respite, homemaker and companion services delivered at home across Central Florida."
      />

      <Hero
        eyebrow="In-home care · Central Florida"
        title="Care for your loved one, in the home they"
        accent="know."
        lede="Familiar rooms. Familiar routines. A caregiver who learns how your mother takes her tea, and shows up when she said she would."
        actions={
          <>
            <Link to="/contact" className="btn btn--primary">
              Request a consultation
            </Link>
            <Link to="/services" className="btn btn--ghost">
              See what we do
            </Link>
          </>
        }
      />

      <section className="band band--twilight">
        <div className="shell shell--narrow">
          {reduced ? (
            <p className="lede" style={{ maxWidth: "100%", color: "var(--on-dark)" }}>
              {THESIS}
            </p>
          ) : (
            <ScrollReveal
              baseOpacity={0.08}
              baseRotation={2}
              blurStrength={5}
              containerClassName="thesis"
              textClassName="thesis__text"
            >
              {THESIS}
            </ScrollReveal>
          )}
        </div>
      </section>

      <div className="crossing crossing--vapor" aria-hidden="true" />

      <section className="band band--vapor">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">What we do</p>
            <h2 className="display section-head__title">
              Six ways we show up at the front door
            </h2>
            <p className="section-head__lede">
              Most families start with one of these and add another later. You
              are never locked into a plan you have outgrown.
            </p>
          </div>

          <ServiceGrid />

          <p style={{ marginTop: "2.5rem" }}>
            <Link to="/services" className="btn btn--ghost">
              More about each service
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--dusk">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">Why families stay</p>
            <h2 className="display section-head__title">
              Twenty years of showing up
            </h2>
          </div>
          <ProofStrip />

          <p style={{ marginTop: "3rem" }}>
            <Link to="/contact" className="btn btn--primary">
              Talk to the care team
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
