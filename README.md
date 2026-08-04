# Rainbow Bridge Health Care

Contact site for Rainbow Bridge Health Care LLC. React + Vite, deployed to
GitHub Pages, with a custom contact form that submits to Brevo.

Design rationale and the brand token system live in [DESIGN.md](DESIGN.md).

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173/rainbow-bridge-health-care/
npm run build
npm run preview
```

Node 18 or newer.

---

## Before launch

**Everything you need to change is in one file: `src/config/site.js`.**

While `settings.highlightPlaceholders` is `true`, any value still carrying `[BRACKETS]` shows
highlighted on the live site. Values the client has supplied render plain. Work until no
highlights remain, then set that flag to `false`.

### 1. Waiting on the client

| Where | What |
|---|---|
| `contact.hours` | She ticked the layout but the four values are still bracketed — confirm them |
| `contact.afterHoursPhone` | A real after-hours line, the mobile, or delete the block |
| `credentials` | Nurse Registry number once issued; confirm or delete the accreditation line |
| `proofPoints` | Families served, caregivers, time to first visit — never verified by anyone |
| `serviceCategories` | Whether the abbreviation is **LSD1** or **LDS1** (spelled out in full for now) |
| Request Service heading | She struck the old one; the replacement wording never arrived |
| About page | A real photograph of her or the team. Stock there would read as "our team" |
| `site.url` | Final domain, once one exists |

Full detail and the rest of her 2026-07-29 markup: `docs/client-feedback-2026-07-29.md`.

### 2. Waiting on counsel

All four legal pages carry a review banner and must keep it until an attorney signs off:
`/privacy`, `/terms`, `/accessibility`, `/non-discrimination`. Counsel also supplies
`legalUpdated` (the effective date), the Privacy Officer and Civil Rights Coordinator names, the
venue county in Terms, and which additional languages need a Section 1557 tagline. Two assumptions
need confirming rather than inheriting: that the agency is a HIPAA covered entity, and that
Section 1557 applies.

### 3. Wire up Brevo

The form is entirely custom — Brevo only receives the submission. No API key
ever reaches the browser, which is what makes this safe to host as a static
site.

1. Brevo → **Contacts → Forms → Create a form**
2. Add the contact attributes the form sends, under
   **Contacts → Settings → Contact attributes**:

   `FIRSTNAME` · `LASTNAME` · `EMAIL` · `SMS` · `DOB` · `GUARDIAN` ·
   `ADDRESS` · `INQUIRY_TYPE` · `URGENCY` · `PREFERRED_CONTACT` ·
   `SERVICES_NEEDED` · `SCHEDULE` · `MESSAGE`

   The first four usually exist already. Create the rest as text attributes.
   `SERVICES_NEEDED` arrives as a comma-separated list.
3. Publish the form, open **Share**, and copy its action URL — it looks like
   `https://sibforms.com/serve/MUIFAJ...`
4. Paste that into `brevo.formAction` in `src/config/site.js`.

If your attribute names differ, change the right-hand side of `brevo.fields`.

**Until `formAction` is set the form runs in preview mode:** it validates and
shows the success state so the page can be demonstrated, but sends nothing, and
says so on screen.

**One limitation worth knowing.** Brevo's hosted-form endpoint sends no CORS
headers, so the browser cannot read the response. The site treats a completed
request as success and a network failure as an error, but it cannot detect a
rejection by Brevo. Send yourself a test message after wiring it up, and
confirm it lands in Brevo before going live.

---

## Deploying

Pushing to `main` builds and publishes automatically via
`.github/workflows/deploy.yml`. Enable it once:

**Settings → Pages → Build and deployment → Source: GitHub Actions**

### Custom domain

1. Add a `public/CNAME` file containing the domain, e.g. `rainbowbridgehc.com`
2. In `.github/workflows/deploy.yml`, change `BASE_PATH` to `/`
3. Point the DNS at GitHub Pages, and set the domain under Settings → Pages

The site is a single-page app, so `vite.config.js` writes `dist/404.html` as a
copy of `index.html`. That is what makes a hard refresh on `/contact` work on
GitHub Pages, which has no server-side rewrites. It also writes a real
`index.html` for every known route so those answer **200** rather than 404 —
which matters for the county and service pages, since they are the ones people
land on from search.

`sitemap.xml` and `robots.txt` are generated in the same step from the same
`ROUTES` array, so they cannot drift from the pages that actually exist. Add a
route to `App.jsx` and to `ROUTES` and everything else follows.

---

## How it is put together

```
src/
  config/site.js      Every piece of business content. The only file most edits touch.
  styles/site.css     Design tokens and the whole design system.
  lib/prism.js        The hero's WebGL refraction shader.
  reactbits/          Vendored React Bits components (see note below).
  components/         Masthead, Footer, Hero, ContactForm, ServiceGrid,
                      CountyCards, TownReveal, ProofStrip, StructuredData,
                      Canonical, Ph.
  pages/              One file per route. /services/:slug and
                      /service-areas/:slug are each driven by one component
                      reading from config, not a file per service or county.
```

### Third-party pieces

- **Three.js** — the hero shader. Custom GLSL, not a stock background: white
  light refracts into the six bands sampled from the logo. DPR is capped at
  1.5, rendering pauses when the hero scrolls out of view or the tab is
  hidden, and reduced-motion freezes it on a still frame.
- **GSAP** — the load sequence and scroll reveals.
- **React Bits** — `SplitText`, `AnimatedContent`, `CountUp`, `ScrollReveal`,
  `GradualBlur`, vendored into `src/reactbits/`. MIT + Commons Clause: free to
  use in a site like this one, not to resell as components.

Two of the vendored components carry local patches, both marked `PATCHED` in
the source:

- `ScrollReveal.jsx` — upstream cleanup killed *every* ScrollTrigger on the
  page, which took out the other animations on route change.
- `AnimatedContent.jsx` — content renders with `visibility: hidden` and was
  lost permanently when its ScrollTrigger never fired, which took out two of
  three service categories in production. Backstopped with an
  IntersectionObserver plus a hard force-show.

Keep those patches if you ever update these files from upstream.

---

## Accessibility

Built to and checked against: visible keyboard focus throughout, form errors
tied to their fields with `aria-describedby`, `prefers-reduced-motion`
honoured (the shader freezes, transform reveals become plain fades), body text
meeting WCAG AA on its ground, and layout holding down to 360px.

If you change the palette, re-check contrast. The spectrum colours are bright
by design and are only safe as light, never as text or as a background for
text.
