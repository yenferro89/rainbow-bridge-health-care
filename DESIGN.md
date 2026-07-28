# Rainbow Bridge Health Care — Design System

Everything here is derived from the logo. Colors were sampled from the source PNG,
not guessed.

## The idea: light through water

A rainbow is what happens when white light passes through water and separates into
order. That is the physics behind the logo, and it is also what the business does:
something diffuse and frightening — a parent declining, a discharge date, a stack of
Medicaid paperwork — passes through a caring structure and comes out ordered and
navigable.

The page enacts this. It opens in deep violet dusk where a live refraction shader
splits white light into the six brand bands. As you scroll, the ground lightens step
by step until the contact form sits in full daylight on cloud white.

Dark to light. Uncertainty to help. That progression is the bridge, and it is why
this is one continuous scroll rather than a stack of boxed sections.

## Color

Sampled directly from `assets/img/logo.png`.

| Token | Hex | Where it came from | Role |
|---|---|---|---|
| `--dusk` | `#180B26` | `--iris` driven to 9% lightness | Deepest ground. Hero only. |
| `--twilight` | `#2A1240` | `--iris` driven to 16% lightness | Mid ground. Transition sections. |
| `--iris` | `#683090` | The script wordmark. 21,939 px — the single most common color in the logo. | Primary brand. |
| `--sky` | `#219AD0` | The words "HEALTH CARE" | Secondary brand. Links, focus, accents. |
| `--vapor` | `#E0F0F8` | The cloud body | Soft light ground, muted text on dark. |
| `--daylight` | `#F7FAFD` | `--vapor` lifted | Light ground. The form sits here. |

### Spectrum

| Band | Hex |
|---|---|
| Red | `#D92428` |
| Orange | `#F47722` |
| Yellow | `#FCE020` |
| Green | `#7CC044` |
| Sky | `#98D9EB` |
| Violet | `#9068AC` |

**Rule: the spectrum only ever appears as light.** It is used in the WebGL
refraction, in thin luminous strokes, and in the focus underline that draws through
the form. It is never a flat fill, never a stripe, never a background. The moment
those six colors become solid blocks, a healthcare brand for aging parents starts
looking like a daycare flyer. Restraint here is the whole difference.

## Type

Two families. No more.

**Display — Fraunces** (variable: `opsz`, `wght`, `SOFT`, `WONK`)
Set with `SOFT` high and `WONK` on. That combination gives rounded terminals and a
slight lilt in the italic that rhymes with the logo's brush script without imitating
it. Used large and sparingly — headline, section openers, pull quotes. Never for
body copy.

**Body and UI — Public Sans**
Commissioned for U.S. public-service communication as part of the USWDS. That is a
deliberate pick, not a neutral one: this business's clients are navigating Medicaid
waivers, LTC insurance, and discharge paperwork, and the face that sets those forms
should feel continuous with the site that explains them. Large x-height and open
apertures also matter for a primary audience in their fifties and sixties reading on
a phone.

Utility text — eyebrows, license numbers, hours — is Public Sans in uppercase with
wide tracking at small sizes.

### Scale

Fluid via `clamp()`. Body sits at 17px minimum rather than 16px, because the reader
is often older and often stressed.

## Layout

One continuous scroll. Sections are separated by a change in ground color, never by
a rule, border, or drop-shadowed card. Content runs on a 12-column grid with wide
margins; the contact block splits to form-plus-details on desktop and stacks below
900px.

## Signature

The hero refraction — a full-viewport GLSL shader where white light bends through an
unseen prism into the six brand bands, drifting slowly over a soft cloud field. It
responds to pointer position and to scroll depth.

This is the one bold thing on the page. Everything around it stays quiet: no custom
cursor, no preloader counter, no magnetic buttons, no scattered hover tricks.

## Motion

One orchestrated load sequence, then scroll-linked reveals.

1. Shader fades up from black over 1.2s
2. Eyebrow rises
3. Headline unmasks line by line, 90ms apart
4. Supporting copy and CTA rise together

After that, sections reveal on entry and the prism angle tracks scroll depth. Form
fields draw a focus underline in spectrum order.

`prefers-reduced-motion: reduce` freezes the shader on a composed still frame and
replaces every transform-based reveal with a plain opacity fade.

## Accessibility floor

- Visible keyboard focus everywhere, using `--sky` at 3px offset
- All body text meets WCAG AA against its ground
- Full keyboard operation of the form, with errors tied via `aria-describedby`
- Reduced motion respected
- Responsive to 360px
- Logo carries real alt text, decorative canvas is `aria-hidden`
