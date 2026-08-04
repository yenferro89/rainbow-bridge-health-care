import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import ServiceGrid from "../components/ServiceGrid.jsx";
import ProofStrip from "../components/ProofStrip.jsx";
import ScrollReveal from "../reactbits/ScrollReveal.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import { serviceAreas } from "../config/site.js";

const THESIS =
  "A rainbow is what happens when light passes through water and comes out in order. That is the work: taking a week that feels like nothing but noise and handing it back to you arranged, so you know what happens next.";

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <>
      <Seo
        title="In-home care for the people you love"
        description="Personal care, homemaker and companion, personal support, life skills development and respite — delivered at home across Orange, Osceola, Seminole and Brevard counties."
      />

      <Hero
        eyebrow="In-home care · Central Florida"
        eyebrowSub={serviceAreas.map((c) => c).join(" · ")}
        title="Because caring is more than helping — it is serving from the"
        accent="heart."
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
              Ten years of showing up
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
