import { Link, useParams, Navigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import ServiceGrid from "../components/ServiceGrid.jsx";
import TownReveal from "../components/TownReveal.jsx";
import ScrollReveal from "../reactbits/ScrollReveal.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import { counties, contact } from "../config/site.js";

/**
 * One page per county. The point is local search, so each carries its own
 * title, description, H1 and genuinely distinct copy — four near-identical
 * pages would rank worse than one good one.
 */
export default function ServiceArea() {
  const { slug } = useParams();
  const reduced = useReducedMotion();
  const county = counties.find((c) => c.slug === slug);

  if (!county) return <Navigate to="/service-areas" replace />;

  const towns = county.towns.join(", ");

  return (
    <>
      <Seo
        title={`In-home care in ${county.name}, Florida`}
        description={`Personal care, homemaker and companion, personal support, life skills development and respite at home across ${county.name} — ${towns}.`}
      />

      <Hero
        compact
        eyebrow="Service area"
        eyebrowSub={towns}
        title={`In-home care across ${county.name},`}
        accent="Florida."
        actions={
          <>
            <Link to="/contact" className="btn btn--primary">
              Request a consultation
            </Link>
            <a href={contact.phoneHref} className="btn btn--ghost">
              Call {contact.phone}
            </a>
          </>
        }
      />

      <section className="band band--twilight" style={{ "--county-band": county.band }}>
        <div className="shell shell--narrow">
          {reduced ? (
            <p className="lede" style={{ maxWidth: "100%", color: "var(--on-dark)" }}>
              {county.angle}
            </p>
          ) : (
            <ScrollReveal
              baseOpacity={0.08}
              baseRotation={2}
              blurStrength={5}
              containerClassName="thesis"
              textClassName="thesis__text"
            >
              {county.angle}
            </ScrollReveal>
          )}
        </div>
      </section>

      <div className="crossing crossing--vapor" aria-hidden="true" />

      <section className="band band--vapor">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">Where we go</p>
            <h2 className="display section-head__title">
              {county.name} towns we serve
            </h2>
          </div>

          <TownReveal towns={county.towns} band={county.band} />

          <p className="section-head__lede" style={{ marginTop: "2.5rem" }}>
            Not on the list? {county.seat} is our anchor in {county.name} and we
            travel from there — ask, and we will tell you plainly whether we can
            reach you.
          </p>
        </div>
      </section>

      <section className="band band--daylight">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">What we do here</p>
            <h2 className="display section-head__title">
              The same care, in {county.name} homes
            </h2>
          </div>

          <ServiceGrid />

          <p style={{ marginTop: "3rem" }}>
            <Link to="/contact" className="btn btn--primary">
              Talk to the care team
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--vapor">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">The other counties</p>
            <h2 className="display section-head__title">We also serve</h2>
          </div>

          <ul className="crosslinks">
            {counties
              .filter((c) => c.slug !== county.slug)
              .map((c) => (
                <li key={c.slug} style={{ "--cross-band": c.band }}>
                  <Link className="crosslink" to={`/service-areas/${c.slug}`}>
                    <span className="crosslink__name">{c.name}</span>
                    <span className="crosslink__towns">
                      {c.towns.slice(0, 3).join(" · ")}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}

