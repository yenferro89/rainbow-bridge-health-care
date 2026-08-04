import { useEffect, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import { asset } from "../lib/asset.js";
import { services, counties, contact } from "../config/site.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * One page per service. These are the pages people actually search for —
 * "respite care Orlando", "personal support Medicaid waiver" — and until now
 * every link to a service landed on the combined /services page instead.
 */
export default function Service() {
  const { slug } = useParams();
  const root = useRef(null);
  const reduced = useReducedMotion();
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    if (reduced || !service) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(".svcpage__img", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".svcpage__media",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.from(".svcpage__body > *", {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svcpage__body", start: "top 82%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, service]);

  if (!service) return <Navigate to="/services" replace />;

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <div ref={root}>
      <Seo
        title={service.name}
        description={`${service.body.slice(0, 150).trim()}… Available across Orange, Osceola, Seminole and Brevard counties.`}
      />

      <Hero
        compact
        eyebrow={service.category}
        title={service.name}
        actions={
          <>
            <Link to="/contact" className="btn btn--primary">
              Request this service
            </Link>
            <a href={contact.phoneHref} className="btn btn--ghost">
              Call {contact.phone}
            </a>
          </>
        }
      />

      <div className="crossing" aria-hidden="true" />

      <section className="band band--daylight">
        <div className="shell">
          <div className="svcpage" style={{ "--svcpage-band": service.band }}>
            <div className="svcpage__media">
              <span className="svcpage__glow" aria-hidden="true" />
              <div className="svcpage__frame">
                <img
                  className="svcpage__img"
                  src={asset(service.image)}
                  srcSet={`${asset(service.image)} 1x, ${asset(service.image2x)} 2x`}
                  alt={service.alt}
                  width="640"
                  height="480"
                  decoding="async"
                />
              </div>
            </div>

            <div className="svcpage__body">
              <p className="svcpage__lead">{service.body}</p>

              {service.lists?.map((list) => (
                <div className="svcpage__list" key={list.heading}>
                  <p className="svcpage__list-heading">{list.heading}</p>
                  <ul>
                    {list.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="svcpage__note">
                <p>
                  <strong>Where we provide it.</strong> In the home, across{" "}
                  {counties.map((c, i) => (
                    <span key={c.slug}>
                      <Link to={`/service-areas/${c.slug}`}>{c.name}</Link>
                      {i < counties.length - 2 ? ", " : i === counties.length - 2 ? " and " : ""}
                    </span>
                  ))}
                  .
                </p>
                <p>
                  <strong>Not sure this is the one you need?</strong> Tell us what
                  a hard day looks like right now and we will work it out with
                  you on the phone — including telling you plainly if what you
                  need is something we do not offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--vapor">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow section-head__eyebrow">Other services</p>
            <h2 className="display section-head__title">
              What else we do at home
            </h2>
          </div>

          <ul className="crosslinks crosslinks--wrap">
            {others.map((s) => (
              <li key={s.slug} style={{ "--cross-band": s.band }}>
                <Link className="crosslink" to={`/services/${s.slug}`}>
                  <span className="crosslink__name">{s.name}</span>
                  <span className="crosslink__towns">{s.category}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: "2.5rem" }}>
            <Link to="/services" className="btn btn--ghost">
              See all services
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
