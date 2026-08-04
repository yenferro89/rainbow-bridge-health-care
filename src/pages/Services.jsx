import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import ServiceGrid from "../components/ServiceGrid.jsx";

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Long term care, personal care services under 21 and Medicaid waiver services — personal care, homemaker and companion, personal support, life skills development and respite — at home across Orange, Osceola, Seminole and Brevard counties."
      />

      <Hero
        compact
        eyebrow="Services"
        title="Help that fits the day you actually"
        accent="have."
        lede="Every family arrives with a different gap. These are the shapes ours comes in — and we will tell you plainly if what you need is something else."
        actions={
          <Link to="/contact" className="btn btn--primary">
            Ask which one fits
          </Link>
        }
      />

      <div className="crossing" aria-hidden="true" />

      <section className="band band--daylight">
        <div className="shell">
          <ServiceGrid />

          <div className="section-head" style={{ marginTop: "4rem", marginBottom: 0 }}>
            <h2 className="display section-head__title">Not sure which you need?</h2>
            <p className="section-head__lede">
              Most people aren't. Tell us what a hard day looks like right now
              and we will work it out together on the phone.
            </p>
            <p>
              <Link to="/contact" className="btn btn--primary">
                Request a consultation
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
