import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { counties } from "../config/site.js";
import { useReducedMotion } from "../lib/useReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * The four counties as large tilting cards.
 *
 * Each carries its band of the spectrum as a bloom that tracks the pointer, so
 * the colour behaves like a light source moving behind the card rather than a
 * flat wash. The tilt is small on purpose — past about six degrees it stops
 * reading as depth and starts reading as a gimmick.
 */
export default function CountyCards() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".county");

      gsap.from(cards, {
        y: 46,
        opacity: 0,
        duration: 0.95,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });

      cards.forEach((card) => {
        const inner = card.querySelector(".county__inner");
        const bloom = card.querySelector(".county__bloom");

        const rx = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });
        const ry = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });
        const bx = gsap.quickTo(bloom, "xPercent", { duration: 0.7, ease: "power3.out" });
        const by = gsap.quickTo(bloom, "yPercent", { duration: 0.7, ease: "power3.out" });

        const move = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 11);
          rx(-py * 8);
          bx(px * 26);
          by(py * 26);
        };

        const leave = () => {
          rx(0);
          ry(0);
          bx(0);
          by(0);
        };

        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        card._cleanup = () => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        };
      });
    }, root);

    return () => {
      gsap.utils.toArray(".county").forEach((c) => c._cleanup?.());
      ctx.revert();
    };
  }, [reduced]);

  return (
    <ul className="counties" ref={root}>
      {counties.map((c) => (
        <li className="county" key={c.slug} style={{ "--county-band": c.band }}>
          <Link className="county__inner" to={`/service-areas/${c.slug}`}>
            <span className="county__bloom" aria-hidden="true" />

            <span className="county__label">County</span>
            <h2 className="county__name">{c.name.replace(" County", "")}</h2>

            <span className="county__towns">{c.towns.slice(0, 4).join(" · ")}</span>

            <span className="county__cta" aria-hidden="true">
              In-home care in {c.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
