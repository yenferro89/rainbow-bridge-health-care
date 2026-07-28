import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import ProofStrip from "../components/ProofStrip.jsx";
import Ph from "../components/Ph.jsx";
import { site } from "../config/site.js";

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
              Why <Ph>[FOUNDER NAME]</Ph> started this
            </h2>
          </div>

          <p className="prose">
            <Ph>
              [Replace this with the real founding story. What happened, who it
              happened to, and what was missing from the care available at the
              time. Two or three paragraphs is plenty — families read this page
              to find out whether you are people they can trust in their
              mother's kitchen, not to read a corporate history.]
            </Ph>
          </p>

          <p className="prose">
            <Ph>
              [A second paragraph about how the agency grew, and what you
              refused to compromise on as it did.]
            </Ph>
          </p>
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
