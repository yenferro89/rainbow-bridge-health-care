# Decisions — Rainbow Bridge Health Care

Append-only log of decisions and their reasoning. Newest first. A decision belongs here the
moment it is made, not when someone remembers later.

**Format:** date, what was decided, why, what was rejected, and whether it still stands.
**Rule:** when a decision supersedes an earlier one, add the new entry *and* edit the doc the old
decision lived in. A decision reversed in conversation but not in the docs will be re-made.

> Seeded 2026-08-03 from the build session (2026-07-28) plus git history. Until now this reasoning
> existed only in machine-local memory on one Mac — which is exactly the failure that cost the QBT
> project its local tooling. Reasoning marked **(inferred)** was not written down at the time.

---

## 2026-07-28 — Placeholders stay bracketed and highlighted, never invented
`src/config/site.js` holds every business detail as a `[BRACKETED]` placeholder, and
`settings.highlightPlaceholders` paints them yellow on the live site. The owner explicitly asked
that no business facts be invented. **Rejected:** filling in plausible defaults (typical hours, a
generic service-area list) to make the site look finished. On a healthcare site an invented detail
is a liability, and a subtle one is worse than an obvious one — hence the highlighting.
**Stands** — hard constraint.

## 2026-07-28 — Brand colors sampled from the client's logo, not designed
Purple `#683090` (the script wordmark — the most common color in the file), cyan `#219AD0`
("HEALTH CARE"), and the spectrum `#D92428 #F47722 #FCE020 #7CC044 #98D9EB #9068AC`. Pulled from
the logo PNG rather than chosen, so the site matches materials the client already uses.
**Rejected:** picking a "nicer" palette. Don't harmonize or substitute these. **Stands.**

## 2026-07-28 — Type: Fraunces over Public Sans
Fraunces at SOFT 70, WONK 0 — WONK enabled *only* on the italic accent word. Public Sans for body.
**(inferred)** Fraunces' softness reads warm and human for in-home care without going script or
"wellness"; the restricted WONK keeps it from becoming a novelty. **Stands.**

## 2026-07-28 — React + Vite instead of static HTML
The build started as a straightforward static contact site. React Bits was requested mid-build,
which required React, so the stack changed to React + Vite. **Worth knowing:** the framework is a
consequence of one component-library request, not a considered architectural choice. If React Bits
ever comes out, there is no other reason for React to stay. **Stands.**

## 2026-07-28 — Public repo, accepted deliberately
GitHub Pages needs a public repo on the free plan. Accepted for a site that is entirely public
marketing content anyway. **Consequence:** never commit client business details that aren't
already public, and never commit credentials. **Stands.**

## 2026-07-28 — Brevo for the contact form, form runs in preview until wired
`brevo.formAction` is unset, so the form is in preview mode and submits nowhere.
**Blocking launch** — the client has to create the Brevo form. **Rejected (inferred):** a
custom backend, which this site has no infrastructure for.

## Later fixes

- `9a9d924` — fixed horizontal overflow across the contact column, footer, and buttons.
  Mobile overflow on a contact page breaks the one thing the site exists to do.
- `fdb2e01` — known routes are served as real files so they return **200**, not a SPA 404
  fallback. Matters for a Pages project site under a subpath, and for how crawlers see it.
- `c7f32b9` — workflow actions bumped to current majors.

---

## Still unresolved — all client-side

- **`src/config/site.js` placeholders** — every business detail still bracketed.
- **Brevo form URL** — not yet created.
- **Privacy and Terms** — need counsel. Not ours to draft.
- **Custom domain** — `README.md` documents the path; not yet done.
