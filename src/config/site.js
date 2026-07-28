/* ==========================================================================
   THE ONLY FILE YOU NEED TO EDIT
   --------------------------------------------------------------------------
   Every piece of business information on this site comes from this file.
   Replace the values below and the whole site updates.

   Anything wrapped in [SQUARE BRACKETS] is a placeholder that must be replaced
   before launch. While `highlightPlaceholders` is true they are shown with a
   yellow highlight on the live site so nothing gets missed.
   ========================================================================== */

export const settings = {
  /** Set to false once every [BRACKETED] value below has been replaced. */
  highlightPlaceholders: true,
};

export const site = {
  name: "Rainbow Bridge Health Care",
  legalName: "Rainbow Bridge Health Care LLC",
  tagline: "We make a difference in caring for your loved one",
  // Used for page titles, share cards and structured data.
  description:
    "In-home care for aging and disabled loved ones. Personal care, respite, homemaker and companion services delivered by caregivers who treat your family like their own.",
  // Replace with the real domain once it is pointed at GitHub Pages.
  url: "https://yenferro89.github.io/rainbow-bridge-health-care",
};

export const contact = {
  phone: "[(407) 555-0100]",
  phoneHref: "tel:+14075550100",

  // A second line answered outside office hours. Delete the block if unused.
  afterHoursPhone: "[(407) 555-0111]",
  afterHoursPhoneHref: "tel:+14075550111",

  email: "[info@rainbowbridgehealthcare.com]",
  emailHref: "mailto:info@rainbowbridgehealthcare.com",

  address: {
    street: "[1234 Example Boulevard, Suite 100]",
    city: "[Orlando]",
    state: "[FL]",
    zip: "[32801]",
  },

  // Paste the "Embed a map" src from Google Maps. Leave empty to show a
  // styled placeholder instead of an empty grey box.
  mapEmbedSrc: "",

  hours: [
    { day: "Monday – Friday", time: "[8:30 AM – 5:00 PM]" },
    { day: "Saturday", time: "[By appointment]" },
    { day: "Sunday", time: "[Closed]" },
    { day: "Care team on call", time: "[24 hours a day]", emphasis: true },
  ],
};

/** Licences and accreditations. Shown in the footer and the trust strip. */
export const credentials = [
  { label: "Home Health Aide licence", value: "[HHA #000000000]" },
  { label: "Homemaker & Companion licence", value: "[HMK/COMP #000000]" },
  { label: "Accreditation", value: "[e.g. CHAP or ACHC]" },
];

/** Trust figures. Keep these honest — they are the first thing families check. */
export const proofPoints = [
  { figure: 20, suffix: "+", label: "Years caring for Central Florida families" },
  { figure: 500, suffix: "+", label: "Families supported at home" },
  { figure: 300, suffix: "+", label: "Screened, trained caregivers" },
  { figure: 2, suffix: " weeks", label: "Typical time from call to first visit" },
];

/**
 * Service lines. These are the standard Florida AHCA service categories —
 * confirm which ones your licences actually cover before launch and delete
 * the rest.
 */
export const services = [
  {
    name: "Personal care",
    body: "Bathing, dressing, grooming, mobility and medication reminders, handled with dignity in your loved one's own bathroom and bedroom.",
    band: "var(--band-red)",
  },
  {
    name: "Respite care",
    body: "Short-term cover so the family caregiver can sleep, work, travel, or simply stop for a while without anyone being left alone.",
    band: "var(--band-orange)",
  },
  {
    name: "Homemaker & companion",
    body: "Meals, laundry, light housekeeping, errands and conversation — the ordinary things that keep a home running and a person connected.",
    band: "var(--band-yellow)",
  },
  {
    name: "Supported living coaching",
    body: "One-to-one coaching on routines, appointments and independence for adults living with a disability.",
    band: "var(--band-green)",
  },
  {
    name: "Life skills development",
    body: "Cooking, budgeting, hygiene and community navigation, taught patiently and at the pace the person sets.",
    band: "var(--band-sky)",
  },
  {
    name: "Long-term care support",
    body: "Ongoing personal care and companion services coordinated with Medicaid waiver, LTC insurance and private pay arrangements.",
    band: "var(--band-violet)",
  },
];

/** Options shown in the contact form's "what do you need" field. */
export const inquiryTypes = [
  "Care for a parent or relative",
  "Care for myself",
  "Respite for a family caregiver",
  "Hospital or rehab discharge coming up",
  "Insurance or Medicaid waiver question",
  "I'd like to work as a caregiver",
  "Something else",
];

export const urgencyOptions = [
  "As soon as possible",
  "Within two weeks",
  "Within a month",
  "Just gathering information",
];

/* ==========================================================================
   BREVO
   --------------------------------------------------------------------------
   The form is fully custom — Brevo only receives the submission. Nothing here
   is secret, and no API key is ever exposed to the browser.

   Setup, once:
     1. Brevo dashboard -> Contacts -> Forms -> Create a form
     2. Add these fields to the Brevo form (Contacts -> Settings -> Contact
        attributes) so the data has somewhere to land:
          EMAIL (already exists)   FIRSTNAME (already exists)
          LASTNAME (already exists)  SMS or PHONE
          RELATIONSHIP   INQUIRY_TYPE   URGENCY   MESSAGE   PREFERRED_CONTACT
     3. Publish the form, open "Share" -> copy the form's action URL. It looks
        like https://sibforms.com/serve/MUIFAJ...
     4. Paste it into formAction below.

   Until formAction is filled in the form runs in preview mode: it validates
   and shows the success state so the page can be demoed, but sends nothing.
   ========================================================================== */
export const brevo = {
  formAction: "",

  /**
   * Left side = this site's field. Right side = the Brevo attribute name.
   * Only change the right side, and only if your Brevo attributes differ.
   */
  fields: {
    firstName: "FIRSTNAME",
    lastName: "LASTNAME",
    email: "EMAIL",
    phone: "SMS",
    relationship: "RELATIONSHIP",
    inquiryType: "INQUIRY_TYPE",
    urgency: "URGENCY",
    preferredContact: "PREFERRED_CONTACT",
    message: "MESSAGE",
  },

  /** Brevo requires these on hosted-form submissions. */
  locale: "en",
  /** Brevo's own bot trap. Must stay empty. */
  honeypotField: "email_address_check",
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const fullAddress = () =>
  `${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.zip}`;
