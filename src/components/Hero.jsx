import PrismCanvas from "./PrismCanvas.jsx";
import SplitText from "../reactbits/SplitText.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";

/**
 * The hero carries the page's thesis and the one bold element on the site.
 * `accent` is the word set in italic Fraunces — keep it to a single word or
 * short phrase, or the emphasis stops meaning anything.
 */
export default function Hero({
  eyebrow,
  eyebrowSub,
  title,
  accent,
  lede,
  actions,
  compact = false,
  prism = true,
}) {
  const reduced = useReducedMotion();

  return (
    <section className={`hero${compact ? " hero--compact" : ""}`}>
      <div className="hero__fallback" aria-hidden="true" />
      {prism && <PrismCanvas />}
      <div className="hero__veil" aria-hidden="true" />

      <div className="shell hero__content">
        {eyebrow && (
          <p className={`eyebrow hero__eyebrow${eyebrowSub ? " hero__eyebrow--tight" : ""}`}>
            {eyebrow}
          </p>
        )}
        {eyebrowSub && <p className="hero__areas">{eyebrowSub}</p>}

        <h1 className="display hero__title">
          {reduced ? (
            <>
              {title} {accent && <em>{accent}</em>}
            </>
          ) : (
            <>
              <SplitText
                tag="span"
                text={title}
                splitType="words"
                delay={38}
                duration={1.0}
                ease="power3.out"
                textAlign="left"
                threshold={0.2}
                rootMargin="0px"
                from={{ opacity: 0, y: 46, filter: "blur(6px)" }}
                to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              />
              {accent && (
                <>
                  {" "}
                  <SplitText
                    tag="em"
                    text={accent}
                    splitType="chars"
                    delay={34}
                    duration={1.1}
                    ease="power3.out"
                    textAlign="left"
                    threshold={0.2}
                    rootMargin="0px"
                    from={{ opacity: 0, y: 58, filter: "blur(8px)" }}
                    to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  />
                </>
              )}
            </>
          )}
        </h1>

        {lede && <p className="lede hero__lede">{lede}</p>}
        {actions && <div className="hero__actions">{actions}</div>}
      </div>
    </section>
  );
}
