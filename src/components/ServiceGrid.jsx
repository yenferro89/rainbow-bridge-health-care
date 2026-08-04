import { serviceCategories } from "../config/site.js";

/**
 * A hairline grid rather than a row of shadowed cards. Each tile carries one
 * band of the spectrum, revealed as a stroke of light on hover — the only
 * place the six colours appear outside the shader.
 *
 * Services are grouped into the client's three categories. Column counts are
 * derived from each group's size rather than fixed: a group of one or two in a
 * three-column grid leaves empty cells that render as stray lavender blocks.
 */
export default function ServiceGrid() {
  return (
    <div className="service-groups">
      {serviceCategories.map((category) => (
        <section className="service-group" key={category.name}>
          <h3 className="service-group__name">{category.name}</h3>

          <ul
            className="services"
            style={{
              "--service-cols": category.services.length,
              "--service-cols-sm": Math.min(2, category.services.length),
            }}
          >
            {category.services.map((s) => (
              <li className="service" key={s.name} style={{ "--service-band": s.band }}>
                <h4 className="service__name">{s.name}</h4>
                <p className="service__body">{s.body}</p>

                {s.lists?.map((list) => (
                  <div className="service__sublist" key={list.heading}>
                    <p className="service__sublist-heading">{list.heading}</p>
                    <ul>
                      {list.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
