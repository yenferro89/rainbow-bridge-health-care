# Rainbow Bridge Health Care

Contact site for Rainbow Bridge Health Care LLC — in-home care, Central Florida. Built
2026-07-28. React + Vite, deployed to GitHub Pages by GitHub Actions
(`.github/workflows/deploy.yml`), live at
https://yenferro89.github.io/rainbow-bridge-health-care/

**The repo is public** because GitHub Pages requires that on the free plan. Assume anything
committed here is world-readable. Never commit client business details that aren't already
public, and never commit credentials.

This is **client work**, not a personal project. That changes the defaults — see below.

## Commands

```bash
npm run dev       # vite dev server
npm run build
npm run preview   # port 4173
```

## Where the knowledge lives

| File | What it holds |
|---|---|
| `docs/decisions.md` | **Why things are the way they are.** Dated log, newest first. |
| `docs/references.md` | The libraries the owner chose (Motion, GSAP, three.js, React Bits) and where each is used |
| `DESIGN.md` | Design system — "light through water", color, type, motion, a11y floor |
| `README.md` | Launch checklist: placeholders, Brevo wiring, legal review, deploy |
| `src/config/site.js` | Every business detail, currently `[BRACKETED]` placeholders |

## Hard constraints — do not violate

- **Never invent business facts.** Hours, phone numbers, addresses, license numbers, staff names,
  service areas, prices — if the client hasn't supplied it, it stays a `[BRACKETED]` placeholder.
  A plausible-looking invented detail on a healthcare site is worse than a visible blank. The
  owner has explicitly asked for this and is fine shipping with placeholders visible.
- **Placeholders are highlighted on purpose.** `settings.highlightPlaceholders` in
  `src/config/site.js` paints them yellow on the live site so nothing unfilled ships silently.
  Only the owner flips it to `false`, and only once the content is genuinely complete.
- **Brand colors are sampled, not chosen.** They come from the client's logo PNG. Don't "improve",
  harmonize, or substitute them. See `DESIGN.md`.
- **Legal pages need counsel.** Privacy and Terms are not for us to draft.
- **It has to feel expensive. Not boring, and not AI-generated.** This is the owner's standing
  instruction and the bar every change is judged against. The modern tooling is there precisely
  to hit it — Motion, GSAP, three.js and React Bits were chosen on purpose, not by accident. See
  `docs/references.md`.

  Build with the vocabulary the site already has: the colour bands, the hairline grids, the
  `band--*` sections, the crossings, the prism shader, `DESIGN.md`'s "light through water" idea.
  Reach for an existing pattern — or a React Bits component — before inventing a new one.

  The tells to avoid: generic card grids with drop shadows, three-column feature blocks, pill
  badges, emoji headings, gradient hero text, and stock "modern SaaS" layout that could belong to
  any site. Static and safe is a failure here, the same as gaudy would be. When a section feels
  flat, the fix is usually motion or depth from the existing toolkit, not more boxes.

## Conventions

- React + Vite, JSX, React Router. Components in `src/components/`, pages in `src/pages/`.
- `src/reactbits/` is vendored React Bits — treat as third-party, don't refactor to taste.
- GSAP + `motion` + `three` are all present; check what a section already uses before adding
  another animation library to it.
- Deploy target is a GitHub Pages **project** site, so the base path is not `/`. Routes must
  resolve under the subpath — known routes are served as real files so they return 200
  (`fdb2e01`), not a SPA 404 fallback.
- Accessibility floor is defined in `DESIGN.md` and is a floor, not an aspiration.

## Keeping this repo bulletproof

This project's knowledge lives here, in git, and nowhere else. When a work session produces
something durable, write it down before the session ends:

- **A decision + its reasoning** → new entry at the top of `docs/decisions.md`.
- **Something tried that failed** → same log.
- **A new hard constraint** → this file, stated inline. Never by reference to a memory file.
- **A decision that supersedes an old one** → log it *and* edit the doc the old one lived in, in
  the same change.

Machine-local memory does not survive a dead laptop. The repo does.
