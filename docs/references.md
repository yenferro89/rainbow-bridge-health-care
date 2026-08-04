# References — libraries and component sources

The owner picked these deliberately and asked that the site be built from them rather than from
generic layout. Check here before inventing a pattern.

> Created 2026-08-03. The links had been shared in an earlier session and existed nowhere in the
> repo, so a later session had no way to know which libraries were intentional. That is the whole
> reason this file exists — **add a link here the moment it is chosen, not later.**

## The stack, and where each one is actually used

| Library | Link | Used in |
|---|---|---|
| **Motion** | https://motion.dev/ | `src/reactbits/CountUp.jsx` (`useInView`, `useMotionValue`, `useSpring` from `motion/react`) |
| **GSAP** | https://gsap.com/ | `src/reactbits/ScrollReveal.jsx`, `AnimatedContent.jsx`, `SplitText.jsx` |
| **three.js** | https://threejs.org/ | `src/lib/prism.js` → `src/components/PrismCanvas.jsx` — the hero shader |
| **React Bits** | https://reactbits.dev/ | Five components vendored into `src/reactbits/` |

`@gsap/react` is also installed for the `useGSAP` hook.

> Motion was confirmed by the owner. GSAP, three.js and React Bits are read from `package.json`
> and actual imports, so the usage is certain even where the exact source link is inferred.
> **If other links were shared and are missing here, add them.**

## Vendored React Bits components

These live in `src/reactbits/` and are treated as third-party — don't refactor them to taste.

| Component | Currently used by |
|---|---|
| `SplitText` | `Hero.jsx` — the display headline, words then chars |
| `ScrollReveal` | `Home.jsx` — the "light through water" thesis band |
| `AnimatedContent` | `ProofStrip.jsx`, `Contact.jsx`, `About.jsx` (Vision/Mission) |
| `CountUp` | `ProofStrip.jsx` — the trust figures |
| `GradualBlur` | vendored, **not yet used** |

React Bits has a much larger catalogue than the five vendored here. Pulling in another one is
expected and fine — vendor it into `src/reactbits/` the same way, and add it to the table above.

## House rules for using any of them

- **Respect reduced motion.** Every animated component is gated on
  `src/lib/useReducedMotion.js` and falls back to a static render. Follow that pattern — see
  `ProofStrip.jsx` for the shape: build the markup, return it plain when reduced, otherwise wrap.
- **Motion is restraint.** See `DESIGN.md`. One idea per section; the animation should be
  noticeable only in its absence.
- **The prism/shader is the site's one bold element.** Don't add a second thing competing with
  it for attention.
- **three.js and GSAP are already heavy** — `three` alone is ~466 kB raw. Prefer a component
  built on a library already in the bundle over adding a new dependency.
