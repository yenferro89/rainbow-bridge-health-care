import AnimatedContent from "../reactbits/AnimatedContent.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import { serviceCategories } from "../config/site.js";

/**
 * Services as an editorial list, not a grid of text boxes.
 *
 * Each category is a numbered chapter; each service is a full-width row with
 * its band of the spectrum running down the left edge and washing across on
 * hover. Rows stagger in as the category scrolls into view. The colour is the
 * brand's only real visual asset, so it does the work here rather than sitting
 * in a 3px hover underline nobody sees.
 */
export default function ServiceGrid() {
  const reduced = useReducedMotion();

  return (
    <div className="chapters">
      {serviceCategories.map((category, i) => {
        const rows = (
          <ol className="chapter__rows">
            {category.services.map((s) => (
              <li className="row" key={s.name} style={{ "--row-band": s.band }}>
                <div className="row__wash" aria-hidden="true" />

                <div className="row__text">
                  <h4 className="row__name">{s.name}</h4>
                  <p className="row__body">{s.body}</p>

                  {s.lists && (
                    <div className="row__lists">
                      {s.lists.map((list) => (
                        <div className="row__list" key={list.heading}>
                          <p className="row__list-heading">{list.heading}</p>
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
              </li>
            ))}
          </ol>
        );

        return (
          <section className="chapter" key={category.name}>
            <header className="chapter__head">
              <span className="chapter__index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="chapter__name">{category.name}</h3>
            </header>

            {reduced ? (
              rows
            ) : (
              <AnimatedContent distance={44} duration={0.9} threshold={0.15}>
                {rows}
              </AnimatedContent>
            )}
          </section>
        );
      })}
    </div>
  );
}
