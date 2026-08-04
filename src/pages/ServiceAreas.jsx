import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import AnimatedContent from "../reactbits/AnimatedContent.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import { counties } from "../config/site.js";

export default function ServiceAreas() {
  const reduced = useReducedMotion();

  const grid = (
    <ul className="areas">
      {counties.map((c) => (
        <li className="area" key={c.slug} style={{ "--area-band": c.band }}>
          <Link className="area__link" to={`/service-areas/${c.slug}`}>
            <span className="area__name">{c.name}</span>
            <span className="area__towns">{c.towns.slice(0, 5).join(" · ")}</span>
            <span className="area__more" aria-hidden="true">
              In-home care in {c.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Seo
        title="Service areas"
        description="In-home care across Orange, Osceola, Seminole and Brevard counties — Orlando, Kissimmee, Sanford, Melbourne and the towns around them."
      />

      <Hero
        compact
        eyebrow="Service areas"
        title="Four counties, one standard of"
        accent="care."
        lede="The office is in Orlando. The care happens wherever your family already lives."
        actions={
          <Link to="/contact" className="btn btn--primary">
            Request a consultation
          </Link>
        }
      />

      <div className="crossing" aria-hidden="true" />

      <section className="band band--daylight">
        <div className="shell">
          {reduced ? (
            grid
          ) : (
            <AnimatedContent distance={40} duration={0.9} threshold={0.15}>
              {grid}
            </AnimatedContent>
          )}
        </div>
      </section>
    </>
  );
}
