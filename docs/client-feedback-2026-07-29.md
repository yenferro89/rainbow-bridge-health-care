# Client feedback — 2026-07-29 markup

Transcribed 2026-08-03 from two annotated PDFs the client produced against the live site:
`In-home care for the people you love` (6pp, homepage) and `Request Service` (2pp).
Annotations are in Spanish; English here is the working translation.

**The site stays in English.** The client writes in Spanish because she is a Spanish speaker —
that is not a request for a Spanish or bilingual site. Do not read the annotation language as a
localisation requirement.

**Status: transcribed, not yet implemented.** Open questions at the bottom must be answered
before the affected parts are built — several are business facts we are not allowed to invent.

---

## 1. Homepage — hero (p1)

| Change | Detail |
|---|---|
| Logo | Make it bigger — *"me gustaría más grandecito el logo para que la imagen del centro se vea mejor"* (so the center image reads better) |
| Counties | Under `IN-HOME CARE · CENTRAL FLORIDA` add: **Orange \| Osceola \| Seminole \| Brevard** |
| Headline | Replace *"Care for your loved one, in the home they know."* with **"Because caring is more than helping… it is serving from the heart"** |
| Subhead | **Delete** *"Familiar rooms. Familiar routines. A caregiver who learns how your mother takes her tea, and shows up when she said she would."* |

## 2. Homepage — services (p3–p4)

**Delete** the section heading *"Six ways we show up at the front door"* and its subtext
*"Most families start with one of these and add another later. You are never locked into a plan
you have outgrown."*

**Regroup all services into three categories:**

1. **Long Term Care Services** — Personal Care, Homemaker & Companion
2. **Personal Care Services (PCS) under 21**
3. **Medicaid Waiver Services** — Personal Support, Life Skills Development Level 1, Respite

**Delete entirely: "Supported living coaching"** — *"esto no lo hacemos"* (we don't do this).
Remove from the services list, the footer nav, and anywhere else it appears.

**"Long-term care support"** as a standalone tile is struck through — it becomes category 1.

### New service copy (client's words, verbatim)

**Personal Care**
> Our Personal Care Services provide compassionate assistance with daily living activities,
> including bathing, grooming, dressing, toileting, mobility, and personal hygiene. We are
> committed to promoting independence, comfort, and dignity while ensuring each client's
> individual needs are met.

**Homemaker & Companion**
> Our Homemaker & Companion Services help maintain a clean, safe, and comfortable home
> environment. Also provide meaningful social interaction and emotional support. Services include:

*Homemaker:* light housekeeping · laundry · meal planning and preparation · grocery shopping
*Companionship:* recreational activities · conversation · assistance with errands · transportation
to appointments · help clients remain engaged and connected with their community

**Respite Care**
> Our Respite Care Services provide temporary relief for primary caregivers while ensuring
> individuals continue to receive safe, compassionate, and high-quality care. Whether for a few
> hours or longer periods, our trained staff offers personalized support in a comfortable and
> familiar environment.

**Life Skills Development Level 1**
> Our Life Skills Development Level 1 services help individuals develop and strengthen essential
> daily living skills to promote greater independence and community involvement. We provide
> personalized support with communication, social interaction, decision-making, self-care, and
> everyday life activities based on each person's goals and abilities.

**Personal Support**
> Our Personal Support Services provide individualized assistance that empowers individuals to
> live as independently as possible. Services may include help with daily routines, assistance
> and training in activities of daily living, such as eating, bathing, personal hygiene, and
> preparation of meals. In some cases this service can also include household chores and access
> to the community.

**Personal Care Service (PCS) Under 21**
> Our Personal Care Service (PCS) under 21 program provides compassionate, individualized
> assistance to individuals 20 years old and younger with medical or functional needs. Our
> trained caregivers help with activities of daily living, personal hygiene, mobility, meal
> assistance, and other essential tasks, allowing clients to remain safe, comfortable, and
> supported in their home while promoting their health, independence, and overall well-being.

> Minor spelling/grammar in the source was corrected when transcribing ("assistace" →
> "assistance", "enviroment" → "environment", "Homemake" → "Homemaker", "essential task" →
> "essential tasks", "allowing client" → "allowing clients"). Meaning unchanged.

**Images:** the client asked for a photo per service — *"si puedes buscar fotitos para cada
servicio en ChatGPT sería fantástico"*. See open question Q6.

## 3. Homepage — proof strip (p4)

**"Twenty years of showing up" → "Ten years of showing up."** Client struck "Twenty" and wrote
"Ten".

## 4. Homepage — new About content (p6)

Three new blocks, client's words, verbatim:

**Our Story**
> Every person has a unique journey, and every family deserves a trusted partner along the way.
> Our agency was founded with a simple belief: exceptional care is not just about meeting needs —
> it's about building relationships, creating opportunities for independence, and making every
> interaction meaningful. We are committed to delivering personalized support that empowers
> individuals to live with confidence, dignity, and purpose in the place they call home.

**Our Vision**
> To redefine home and community care by creating a future where every individual is empowered to
> thrive, every family feels supported, and exceptional care becomes the standard — not the
> exception.

**Our Mission**
> We deliver personalized care that goes beyond daily support. By building meaningful
> relationships, promoting independence, and embracing each person's unique abilities, we create
> experiences that inspire confidence, enrich lives, and strengthen the communities we serve.

## 5. Real business details — placeholders now fillable (p5)

**These are the first real facts the client has supplied.** They replace `[BRACKETED]`
placeholders in `src/config/site.js`.

| Field | Value |
|---|---|
| Address | **7362 Futures Dr. Suite 14 Unit 109, Orlando, FL 32819** |
| Office phone | **407-270-7752** |
| Mobile | **407-280-2700** — "Text or Call" |
| eFax | **407-550-8877** |
| Email | **admin@rainbowbridgehc.com** |
| Homemaker & Companion licence | **240078** |
| Nurse Registry Licence | Replaces the "Home Health Aide licence" line. **In process — no number yet** (*"está en proceso, todavía no tenemos número"*) |

Note the email domain is `rainbowbridgehc.com`, **not** `rainbowbridgehealthcare.com`.

## 6. Request Service page (PDF 2)

### Form structure

Field order becomes: **CLIENT** section → First name → Last name → Date of Birth →
Parent/Legal Guardian → full address incl. County → Email → Phone.
(*"Esto estaría después de la dirección"* — email and phone move below the address.)

| Field | Change |
|---|---|
| First name | Required |
| Last name | Required |
| **Date of Birth** | **New.** Required |
| **Parent/Legal Guardian** | **New.** Required. First and last name. Sits under Date of Birth |
| **Full address incl. County** | **New.** Required. Sits under Parent/Legal Guardian |
| Email | Optional |
| Phone | Required |
| "Who is the care for?" | **Delete** (and its *"My mother, my husband, myself…"* helper) |
| "How should we reach you?" | Keep as is — client ticked it ✓ |
| "Tell us what's happening" | **Delete**, incl. *"What does a typical day look like right now? What worries you most?"* |
| **Days/times requested** | **New**, replaces the above: "Please tell us which days and times are you requesting services?" — example text: *monday-friday 2pm-5pm saturdays 1pm-6pm* |
| **Services Needed** | **New.** Required, check all that apply: Personal Care Services · Respite Care Services · Personal Supports · Life Skills Development Level 1 · Homemaker & Companion |
| Consent checkbox | **Delete** — *"Yes, a member of the Rainbow Bridge care team may contact me about this enquiry…"* |
| **Additional Comment** | **New.** Free text, optional |

### Page copy

**Delete** the intro *"There are no wrong answers, and nothing here commits you to anything. The
more you can tell us, the more useful our first call will be."*

The heading ending in *"…your loved one"* is struck through — see Q5.

### Right-hand contact rail

Client circled the EMAIL / OFFICE / LICENSED & ACCREDITED blocks and wrote *"esta info ya la
tienes en uno de los PDF"* — use the real values from §5 above. **Hours** got a ✓ (see Q4).

---

## Open questions — answers needed before building these parts

| # | Question | Blocks |
|---|---|---|
| **Q1** | **LSD1 or LDS1?** The client wrote "LSD1" once (p3) and "LDS1" twice (p4). "Life Skills Development" suggests LSD, but this is a Florida Medicaid waiver service name and we should not guess. Or drop the abbreviation and spell it out everywhere? | Service naming site-wide |
| **Q2** | **Accreditation line** — client wrote *"esto no sé qué es"* (I don't know what this is) against `Accreditation: [e.g. CHAP or ACHC]`. Remove the line entirely, or keep it pending? | Footer licence block |
| **Q3** | **After-hours phone** — still `[(407) 555-0111]` and never annotated. Is there a real after-hours number, should it use the mobile (407-280-2700), or should the line go? | Footer + contact rail |
| **Q4** | **Hours** — client ticked ✓ next to Mon–Fri `[8:30 AM – 5:00 PM]`, Sat `[By appointment]`, Sun `[Closed]`, but those are still bracketed placeholders. Does the ✓ confirm the values as real, or just approve the layout? | Un-bracketing hours |
| **Q5** | **Request Service heading** — the struck heading's first line is above the page break, so only *"…your loved one"* is visible. What should it say instead? | Request Service hero |
| **Q6** | **Service photos** — client asked for a photo per service. I can't generate images. Options: she supplies photos, we license stock, or we skip photos and use the existing color bands. | Service cards |
| **Q7** | **County SEO** — "add the counties and do SEO for each page." Recommendation below; needs a decision. | Site architecture |
| **Q8** | **Page 2 of the homepage PDF** printed almost blank — it is a scroll-reveal section captured mid-animation. I can read the copy from source, but **I cannot tell whether the client marked anything on it.** Worth a second look at her original. | Unknown |

## Recommendation for Q7 (county SEO)

Four counties — Orange, Osceola, Seminole, Brevard. Strongest option is a real page per county
(`/service-areas/orange-county` etc.), each with its own `<title>`, meta description, H1, genuine
county-specific copy (cities served, local context), and `LocalBusiness` schema with `areaServed`.
Thin duplicate pages hurt more than they help, so each needs real distinct content — which means
copy the client has to approve.

Cheaper interim step: county names in the hero (already requested), in the footer, in the
`description`, and `areaServed` on the existing schema. That captures some of the benefit with no
new content to write.

The site already serves known routes as real files (`fdb2e01`), so new routes work with GitHub
Pages — no SPA-404 problem.
