import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceCategories } from "../config/site.js";
import { asset } from "../lib/asset.js";
import { Link } from "react-router-dom";
import { useReducedMotion } from "../lib/useReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * Services as full-bleed alternating panels.
 *
 * Each service gets a large photograph with its band of the spectrum blooming
 * behind it, a big ghosted index number, and copy set at reading width. Panels
 * alternate side to side so the eye zig-zags down the page instead of running
 * along one rail.
 *
 * Motion is scroll-linked rather than fire-once: the photo drifts against the
 * scroll inside its frame, the bloom drifts further, and the whole panel lifts
 * and clears as it arrives. That parallax is what stops a long list of six
 * services reading as a document.
 */
export default function ServiceGrid() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".svc").forEach((panel) => {
        const img = panel.querySelector(".svc__img");
        const glow = panel.querySelector(".svc__glow");
        const copy = panel.querySelector(".svc__copy");
        const index = panel.querySelector(".svc__index");

        // Arrival: the frame clears itself, the copy rises behind it.
        gsap.from(panel.querySelector(".svc__frame"), {
          yPercent: 8,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 82%", once: true },
        });

        gsap.from(copy.children, {
          y: 26,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 78%", once: true },
        });

        // Scroll-linked drift. Three speeds so the panel has depth rather than
        // sliding as one flat card.
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });

        // Vertical only. An x drift here pushed the bloom past the shell gutter
        // and put the whole document into horizontal overflow on scroll.
        gsap.to(glow, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1.1 },
        });

        gsap.to(index, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 0.9 },
        });
      });
    }, root);

    // Positions are measured before the lazy photographs land, so refresh once
    // everything has settled or the triggers fire at the wrong scroll offsets.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 1200);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <div className="svcs" ref={root}>
      {serviceCategories.map((category, ci) => (
        <section className="svcgroup" key={category.name}>
          <header className="svcgroup__head">
            <h3 className="svcgroup__name">{category.name}</h3>
            <span className="svcgroup__rule" aria-hidden="true" />
          </header>

          {category.services.map((s, si) => {
            const n = String(
              serviceCategories.slice(0, ci).reduce((a, c) => a + c.services.length, 0) + si + 1
            ).padStart(2, "0");

            return (
              <article
                className="svc"
                key={s.name}
                style={{ "--svc-band": s.band }}
              >
                <div className="svc__media">
                  <span className="svc__glow" aria-hidden="true" />
                  <span className="svc__index" aria-hidden="true">
                    {n}
                  </span>
                  {/* The photograph is the biggest target on the panel and is
                      what people actually click, so it links through too. It is
                      hidden from assistive tech and skipped by the keyboard —
                      the heading link beside it already carries the same
                      destination and a real accessible name, and two tab stops
                      to one place is just noise. */}
                  <Link
                    className="svc__frame"
                    to={`/services/${s.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {s.image && (
                      <img
                        className="svc__img"
                        src={asset(s.image)}
                        srcSet={`${asset(s.image)} 1x, ${asset(s.image2x)} 2x`}
                        alt={s.alt}
                        width="640"
                        height="480"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </Link>
                </div>

                <div className="svc__copy">
                  <h4 className="svc__name">
                    <Link className="svc__link" to={`/services/${s.slug}`}>
                      {s.name}
                    </Link>
                  </h4>
                  <p className="svc__body">{s.body}</p>

                  <p className="svc__more">
                    <Link to={`/services/${s.slug}`}>
                      More about {s.name}
                    </Link>
                  </p>

                  {s.lists && (
                    <div className="svc__lists">
                      {s.lists.map((list) => (
                        <div className="svc__list" key={list.heading}>
                          <p className="svc__list-heading">{list.heading}</p>
                          <ul>
                            {list.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}
