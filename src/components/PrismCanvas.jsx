import { useEffect, useRef } from "react";
import { initPrism } from "../lib/prism.js";
import { useReducedMotion } from "../lib/useReducedMotion.js";

/**
 * Mounts the refraction shader behind the hero. The canvas is decorative, so
 * it is hidden from assistive technology; the CSS gradient underneath is a
 * designed fallback for anything without WebGL.
 */
export default function PrismCanvas({ scrollDriven = true }) {
  const canvasRef = useRef(null);
  const prismRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prism = initPrism(canvas, { reduced });
    prismRef.current = prism;
    if (!prism) return;

    // Fade the refraction up rather than snapping it on.
    let raf;
    if (reduced) {
      prism.setIntro(1);
      canvas.classList.add("is-lit");
    } else {
      const startedAt = performance.now();
      const fade = (now) => {
        const t = Math.min((now - startedAt) / 1400, 1);
        prism.setIntro(t * t * (3 - 2 * t));
        if (t < 1) raf = requestAnimationFrame(fade);
      };
      raf = requestAnimationFrame(fade);
      requestAnimationFrame(() => canvas.classList.add("is-lit"));
    }

    let onScroll;
    if (scrollDriven) {
      onScroll = () => {
        const h = window.innerHeight || 1;
        prism.setScroll(Math.min(Math.max(window.scrollY / h, 0), 1));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (onScroll) window.removeEventListener("scroll", onScroll);
      prism.destroy();
      prismRef.current = null;
    };
  }, [reduced, scrollDriven]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
