import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import ProofStrip from "../components/ProofStrip.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import { site, contact } from "../config/site.js";

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  {
    label: "Our vision",
    band: "var(--band-sky)",
    body: "To redefine home and community care by creating a future where every individual is empowered to thrive, every family feels supported, and exceptional care becomes the standard — not the exception.",
  },
  {
    label: "Our mission",
    band: "var(--band-violet)",
    body: "We deliver personalized care that goes beyond daily support. By building meaningful relationships, promoting independence, and embracing each person's unique abilities, we create experiences that inspire confidence, enrich lives, and strengthen the communities we serve.",
  },
];

export default function About() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // The story reads in as one block; the statements arrive in sequence.
      gsap.from(".story__body > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".story", start: "top 78%", once: true },
      });

      gsap.from(".statement", {
        y: 44,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".statements", start: "top 82%", once: true },
      });

      // Each bloom drifts against the scroll so the panels have depth.
      gsap.utils.toArray(".statement__bloom").forEach((b, i) => {
        gsap.to(b, {
          yPercent: i % 2 ? -16 : 16,
          ease: "none",
          scrollTrigger: {
            trigger: ".statements",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root}>
      <Seo
        title="About"
        description={`${site.legalName} — who we are, what we believe, and how we work with families across Central Florida.`}
      />

      <Hero
        compact
        eyebrow="About"
        title="We make a difference in caring for your loved"
        accent="one."
        lede="That line has been on our logo since the beginning. This page is where we show our work on it."
      />

      <div className="crossing" aria-hidden="true" />

      <section className="band band--daylight story">
        <div className="shell">
          <div className="story__grid">
            <div className="story__aside">
              <p className="eyebrow section-head__eyebrow">Our story</p>
              <h2 className="display story__title">Why we started this</h2>
            </div>

            <div className="story__body">
              <p className="story__lead">
                Every person has a unique journey, and every family deserves a
                trusted partner along the way.
              </p>
              <p className="prose">
                Our agency was founded with a simple belief: exceptional care is
                not just about meeting needs — it's about building
                relationships, creating opportunities for independence, and
                making every interaction meaningful.
              </p>
              <p className="prose">
                We are committed to delivering personalized support that empowers
                individuals to live with confidence, dignity, and purpose in the
                place they call home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--vapor">
        <div className="shell">
          <ul className="statements">
            {STATEMENTS.map((s) => (
              <li
                className="statement"
                key={s.label}
                style={{ "--statement-band": s.band }}
              >
                <span className="statement__bloom" aria-hidden="true" />
                <p className="statement__label">{s.label}</p>
                <p className="statement__body">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band--daylight">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">By the numbers</p>
            <h2 className="display section-head__title">Where we are today</h2>
          </div>
          <ProofStrip />

          <div className="about__cta">
            <Link to="/contact" className="btn btn--primary">
              Start a conversation
            </Link>
            <a href={contact.phoneHref} className="btn btn--ghost">
              Call {contact.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
