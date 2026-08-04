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

## 2026-08-03 — Build in the site's own vocabulary, not generic AI layout
Owner instruction, given after a Vision/Mission block was first built as a plain two-column card
grid. That block was rebuilt using the existing hairline `.services` grid with two spectrum bands
and `AnimatedContent`, which is the site's established idiom. **Rejected:** inventing new
component patterns when an existing one fits. React Bits was vendored deliberately (see
2026-07-28) and should be used. **Stands** — hard constraint in `CLAUDE.md`.

## 2026-08-03 — Site stays English-only
The client annotates in Spanish because she is a Spanish speaker. That is not a request for a
Spanish or bilingual site, and it should not be read as one. **Stands.**

## 2026-08-03 — Client supplied real business details; placeholders start coming out
First real facts received (address, phones, email, Homemaker & Companion licence 240078). See
`docs/client-feedback-2026-07-29.md` §5. The never-invent-business-facts constraint is unchanged —
what changed is that some blanks can now be filled from a real source. Anything still unanswered
stays bracketed and highlighted. **Stands.**

## 2026-08-03 — Repo stays public; going private was considered and rejected
Raised because this is client work and the repo records an unfinished pre-launch state.
**Rejected** on cost/benefit: GitHub Pages does not serve private repos on the free plan, so
private means either the live URL 404s, moving to Cloudflare Pages / Netlify / Vercel and changing
the review URL, or $4/mo for GitHub Pro. Against that, nothing here is actually sensitive —
`README.md` has documented the same launch checklist publicly since the site was built, so the
pre-launch state was never private to begin with. **Stands** — revisit only if something genuinely
non-public needs to live in the repo, which would be a reason to reopen it properly.

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
