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
    "In-home care for aging and disabled loved ones across Orange, Osceola, Seminole and Brevard counties. Personal care, homemaker and companion, personal support, life skills development and respite — delivered by caregivers who treat your family like their own.",
  // Replace with the real domain once it is pointed at GitHub Pages.
  url: "https://yenferro89.github.io/rainbow-bridge-health-care",
};

export const contact = {
  phone: "(407) 270-7752",
  phoneHref: "tel:+14072707752",
  phoneLabel: "Office",

  // Answered by text or call.
  mobilePhone: "(407) 280-2700",
  mobilePhoneHref: "tel:+14072802700",
  mobileLabel: "Mobile — text or call",

  eFax: "(407) 550-8877",

  // A second line answered outside office hours. Delete the block if unused.
  // OPEN: the client never supplied this. Ask whether it exists, whether the
  // mobile above covers it, or whether the line should be removed.
  afterHoursPhone: "[(407) 555-0111]",
  afterHoursPhoneHref: "tel:+14075550111",

  email: "admin@rainbowbridgehc.com",
  emailHref: "mailto:admin@rainbowbridgehc.com",

  address: {
    street: "7362 Futures Dr. Suite 14 Unit 109",
    city: "Orlando",
    state: "FL",
    zip: "32819",
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
  // Replaces the old "Home Health Aide licence" line at the client's request.
  { label: "Nurse Registry Licence", value: "[In process]" },
  { label: "Homemaker & Companion licence", value: "240078" },
  // OPEN: the client wrote "esto no sé qué es" against this. Confirm whether
  // the agency holds an accreditation, or delete the line.
  { label: "Accreditation", value: "[e.g. CHAP or ACHC]" },
];

/**
 * Trust figures. Keep these honest — they are the first thing families check.
 *
 * OPEN: only the first figure has been confirmed by the client (she changed
 * "Twenty years" to "Ten"). The other three were scaffolding from the build and
 * have never been verified. They are bracketed until she confirms real numbers.
 */
export const proofPoints = [
  { figure: 10, suffix: "+", label: "Years caring for Central Florida families" },
  { figure: 500, suffix: "+", label: "[Families supported at home]" },
  { figure: 300, suffix: "+", label: "[Screened, trained caregivers]" },
  { figure: 2, suffix: " weeks", label: "[Typical time from call to first visit]" },
];

/** Counties served. Shown in the hero, the footer and the schema's areaServed. */
export const serviceAreas = ["Orange", "Osceola", "Seminole", "Brevard"];

/**
 * Service lines, grouped into the three categories the client asked for on
 * 2026-07-29. All body copy below is hers, verbatim apart from spelling fixes.
 * See docs/client-feedback-2026-07-29.md.
 *
 * "Supported living coaching" was removed at her request — the agency does not
 * offer it. Do not reinstate it.
 */
export const serviceCategories = [
  {
    name: "Long Term Care Services",
    services: [
      {
        name: "Personal Care",
        body: "Our Personal Care Services provide compassionate assistance with daily living activities, including bathing, grooming, dressing, toileting, mobility, and personal hygiene. We are committed to promoting independence, comfort, and dignity while ensuring each client's individual needs are met.",
        band: "var(--band-red)",
      },
      {
        name: "Homemaker & Companion",
        body: "Our Homemaker & Companion Services help maintain a clean, safe, and comfortable home environment. Also provide meaningful social interaction and emotional support. Services include:",
        band: "var(--band-orange)",
        lists: [
          {
            heading: "Homemaker",
            items: [
              "Light housekeeping",
              "Laundry",
              "Meal planning and preparation",
              "Grocery shopping",
            ],
          },
          {
            heading: "Companionship",
            items: [
              "Recreational activities",
              "Conversation",
              "Assistance with errands",
              "Transportation to appointments",
              "Help clients remain engaged and connected with their community",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Personal Care Services (PCS) Under 21",
    services: [
      {
        name: "Personal Care Service (PCS) Under 21",
        body: "Our Personal Care Service (PCS) under 21 program provides compassionate, individualized assistance to individuals 20 years old and younger with medical or functional needs. Our trained caregivers help with activities of daily living, personal hygiene, mobility, meal assistance, and other essential tasks, allowing clients to remain safe, comfortable, and supported in their home while promoting their health, independence, and overall well-being.",
        band: "var(--band-yellow)",
      },
    ],
  },
  {
    name: "Medicaid Waiver Services",
    services: [
      {
        name: "Personal Support",
        body: "Our Personal Support Services provide individualized assistance that empowers individuals to live as independently as possible. Services may include help with daily routines, assistance and training in activities of daily living, such as eating, bathing, personal hygiene, and preparation of meals. In some cases this service can also include household chores and access to the community.",
        band: "var(--band-green)",
      },
      {
        // OPEN: the client abbreviated this both "LSD1" and "LDS1". Spelled out
        // in full until she confirms which is correct.
        name: "Life Skills Development Level 1",
        body: "Our Life Skills Development Level 1 services help individuals develop and strengthen essential daily living skills to promote greater independence and community involvement. We provide personalized support with communication, social interaction, decision-making, self-care, and everyday life activities based on each person's goals and abilities.",
        band: "var(--band-sky)",
      },
      {
        name: "Respite",
        body: "Our Respite Care Services provide temporary relief for primary caregivers while ensuring individuals continue to receive safe, compassionate, and high-quality care. Whether for a few hours or longer periods, our trained staff offers personalized support in a comfortable and familiar environment.",
        band: "var(--band-violet)",
      },
    ],
  },
];

/** Flat list, derived. Used by the footer nav and anywhere order-only matters. */
export const services = serviceCategories.flatMap((c) => c.services);

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
