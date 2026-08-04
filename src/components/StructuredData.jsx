import { useEffect } from "react";
import {
  site,
  contact,
  credentials,
  services,
  serviceAreas,
  fullAddress,
} from "../config/site.js";

const SCRIPT_ID = "ld-json-localbusiness";

/** A [BRACKETED] value is an unfilled placeholder — never publish it as fact. */
const real = (v) => typeof v === "string" && !v.trim().startsWith("[");

/**
 * LocalBusiness / HomeAndConstructionBusiness schema for the four counties we
 * serve. Injected once, client-side — the site is a Vite SPA with no
 * prerender, so there is no HTML to bake it into.
 *
 * Only confirmed values go in. Placeholders are skipped rather than emitted,
 * because structured data asserting a fake address to Google is worse than
 * having no structured data at all.
 */
export default function StructuredData() {
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HomeHealthCareService"],
      name: site.legalName,
      description: site.description,
      url: site.url,
      areaServed: serviceAreas.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county} County, Florida`,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "In-home care services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name },
        })),
      },
    };

    if (real(contact.phone)) data.telephone = contact.phone;
    if (real(contact.email)) data.email = contact.email;

    const a = contact.address;
    if (real(a.street) && real(a.city) && real(a.state) && real(a.zip)) {
      data.address = {
        "@type": "PostalAddress",
        streetAddress: a.street,
        addressLocality: a.city,
        addressRegion: a.state,
        postalCode: a.zip,
        addressCountry: "US",
      };
    }

    if (contact.geo?.lat && contact.geo?.lng) {
      data.geo = {
        "@type": "GeoCoordinates",
        latitude: contact.geo.lat,
        longitude: contact.geo.lng,
      };
    }

    const licences = credentials
      .filter((c) => real(c.value))
      .map((c) => `${c.label}: ${c.value}`);
    if (licences.length) data.hasCredential = licences;

    let tag = document.getElementById(SCRIPT_ID);
    if (!tag) {
      tag = document.createElement("script");
      tag.id = SCRIPT_ID;
      tag.type = "application/ld+json";
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(data);
  }, []);

  return null;
}
