import { services } from "../config/site.js";

/**
 * A hairline grid rather than a row of shadowed cards. Each tile carries one
 * band of the spectrum, revealed as a stroke of light on hover — the only
 * place the six colours appear outside the shader.
 */
export default function ServiceGrid({ limit }) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <ul className="services">
      {list.map((s) => (
        <li
          className="service"
          key={s.name}
          style={{ "--service-band": s.band }}
        >
          <h3 className="service__name">{s.name}</h3>
          <p className="service__body">{s.body}</p>
        </li>
      ))}
    </ul>
  );
}
