import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { nav, site } from "../config/site.js";
import { asset } from "../lib/asset.js";

export default function Masthead() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Pages without a dark hero need the frosted bar from the very top,
  // otherwise the light-on-light nav is unreadable.
  useEffect(() => {
    const hasDarkHero = !!document.querySelector(".hero");
    const onScroll = () => setStuck(!hasDarkHero || window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [location.pathname]);

  // Escape closes, and focus returns to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`masthead${stuck ? " is-stuck" : ""}`}>
      <div className="shell masthead__inner">
        <Link to="/" className="brand" aria-label={`${site.name} — home`}>
          <img
            className="brand__logo"
            src={asset("img/logo-420.png")}
            width="420"
            height="252"
            alt={`${site.name}. ${site.tagline}.`}
          />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="primary-nav"
          ref={panelRef}
          className={`nav${open ? " is-open" : ""}`}
          aria-label="Primary"
        >
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="nav__link"
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn--primary nav__cta">
            Request a consultation
          </Link>
        </nav>
      </div>

      <button
        type="button"
        className={`nav-scrim${open ? " is-visible" : ""}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
