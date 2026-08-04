import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import CountyCards from "../components/CountyCards.jsx";

export default function ServiceAreas() {
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
          <CountyCards />
        </div>
      </section>
    </>
  );
}
