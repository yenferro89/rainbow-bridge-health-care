import CountUp from "../reactbits/CountUp.jsx";
import AnimatedContent from "../reactbits/AnimatedContent.jsx";
import { proofPoints } from "../config/site.js";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import Ph from "./Ph.jsx";

export default function ProofStrip() {
  const reduced = useReducedMotion();

  const items = (
    <ul className="trust">
      {proofPoints.map((p) => (
        <li className="trust__item" key={p.label}>
          <span className="trust__figure">
            {reduced ? p.figure : <CountUp to={p.figure} duration={1.6} />}
            {p.suffix}
          </span>
          <span className="trust__label">
            <Ph>{p.label}</Ph>
          </span>
        </li>
      ))}
    </ul>
  );

  if (reduced) return items;

  return (
    <AnimatedContent distance={40} duration={0.9} threshold={0.25}>
      {items}
    </AnimatedContent>
  );
}
