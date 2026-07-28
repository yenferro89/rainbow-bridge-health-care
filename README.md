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

### 1. Replace the placeholders

**Everything you need to change is in one file: `src/config/site.js`.**

While `settings.highlightPlaceholders` is `true`, every unreplaced value shows
with a yellow highlight on the live site, so nothing slips through. Work down
the file until no highlights remain, then set that flag to `false`.

The values waiting on you:

| Where | What |
|---|---|
| `contact.phone` / `phoneHref` | Main number |
| `contact.afterHoursPhone` | After-hours line, or delete the block |
| `contact.email` / `emailHref` | Enquiries address |
| `contact.address` | Street, city, state, ZIP |
| `contact.mapEmbedSrc` | Google Maps embed URL (empty shows a placeholder panel) |
| `contact.hours` | Opening hours |
| `credentials` | HHA licence, HMK/COMP licence, accreditation |
| `proofPoints` | Years, families served, caregivers, time to first visit |
| `services` | Confirm which service lines your licences actually cover, delete the rest |
| `site.url` | Final domain |

Two pages also carry inline placeholders that are not in the config file:

- `src/pages/About.jsx` — the founding story
- `src/pages/Privacy.jsx` and `src/pages/Terms.jsx` — sections marked for counsel

### 2. Wire up Brevo

The form is entirely custom — Brevo only receives the submission. No API key
ever reaches the browser, which is what makes this safe to host as a static
site.

1. Brevo → **Contacts → Forms → Create a form**
2. Add the contact attributes the form sends, under
   **Contacts → Settings → Contact attributes**:

   `FIRSTNAME` · `LASTNAME` · `EMAIL` · `SMS` · `RELATIONSHIP` ·
   `INQUIRY_TYPE` · `URGENCY` · `PREFERRED_CONTACT` · `MESSAGE`

   The first four usually exist already. Create the rest as text attributes.
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

### 3. Legal review

`Privacy.jsx` and `Terms.jsx` are structurally complete starting points, not
finished documents. A Notice of Privacy Practices for a Florida home care
agency has statutory content requirements under 45 CFR §164.520. Have counsel
complete them.

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
GitHub Pages, which has no server-side rewrites.

---

## How it is put together

```
src/
  config/site.js      Every piece of business content. The only file most edits touch.
  styles/site.css     Design tokens and the whole design system.
  lib/prism.js        The hero's WebGL refraction shader.
  reactbits/          Vendored React Bits components (see note below).
  components/         Masthead, Footer, Hero, ContactForm, ServiceGrid, ProofStrip.
  pages/              One file per route.
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
- `AnimatedContent.jsx` — content rendered with `visibility: hidden` and was
  lost permanently if its trigger never fired. Added a failsafe.

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
