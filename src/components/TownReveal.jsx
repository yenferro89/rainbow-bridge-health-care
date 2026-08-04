import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../lib/useReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * The towns of a county, set at display scale and revealed one after another.
 *
 * A list of place names is the most SEO-load-bearing content on a county page
 * and it was previously rendered as small bordered chips, which read as
 * metadata rather than as the point. At display size, staggered in with the
 * county's band under each one, it becomes the section.
 */
export default function TownReveal({ towns, band }) {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".town", {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.055,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, towns]);

  return (
    <ul className="towns" ref={root} style={{ "--town-band": band }}>
      {towns.map((t) => (
        <li className="town__clip" key={t}>
          <span className="town">{t}</span>
        </li>
      ))}
    </ul>
  );
}
