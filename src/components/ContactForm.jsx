import { useRef, useState } from "react";
import {
  brevo,
  inquiryTypes,
  urgencyOptions,
  serviceOptions,
  contact,
} from "../config/site.js";
import Ph from "./Ph.jsx";

const EMPTY = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  guardian: "",
  address: "",
  email: "",
  phone: "",
  inquiryType: "",
  urgency: "",
  preferredContact: "Phone call",
  servicesNeeded: [],
  schedule: "",
  message: "",
};

/** Deliberately permissive. Rejecting a real address is worse than accepting a typo. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Ten digits somewhere in the string, however the person chose to format it. */
const digits = (v) => v.replace(/\D/g, "");

function validate(values) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = "Enter a first name.";
  if (!values.lastName.trim()) errors.lastName = "Enter a last name.";
  if (!values.dateOfBirth.trim()) errors.dateOfBirth = "Enter a date of birth.";
  if (!values.guardian.trim()) {
    errors.guardian = "Enter the parent or legal guardian's full name.";
  }
  if (!values.address.trim()) {
    errors.address = "Enter the full address, including the county.";
  }

  // Email is optional here — the client asked for it. Only validate a value
  // that was actually typed.
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = "That address is missing an @ or a domain.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Enter a phone number.";
  } else if (digits(values.phone).length < 10) {
    errors.phone = "A US phone number needs 10 digits.";
  }

  if (!values.inquiryType) errors.inquiryType = "Choose what you need help with.";
  if (!values.servicesNeeded.length) {
    errors.servicesNeeded = "Choose at least one service.";
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | submitting | done | failed
  const formRef = useRef(null);
  const successRef = useRef(null);
  const honeypotRef = useRef(null);

  const previewMode = !brevo.formAction;

  const clearError = (name) =>
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  /** Services Needed is a multi-select, so it toggles into an array. */
  const toggleService = (option) => (e) => {
    const on = e.target.checked;
    setValues((v) => ({
      ...v,
      servicesNeeded: on
        ? [...v.servicesNeeded, option]
        : v.servicesNeeded.filter((s) => s !== option),
    }));
    clearError("servicesNeeded");
  };

  const update = (name) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear a field's error as soon as the person starts fixing it.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (state === "submitting") return;

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length) {
      const firstKey = Object.keys(found)[0];
      const el = formRef.current?.querySelector(`[name="${firstKey}"]`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    // Brevo's own bot trap. A real person never sees or fills this.
    if (honeypotRef.current?.value) {
      setState("done");
      return;
    }

    setState("submitting");

    if (previewMode) {
      console.warn(
        "[contact form] Preview mode — nothing was sent.\n" +
          "Add your Brevo form URL to `brevo.formAction` in src/config/site.js."
      );
      await new Promise((r) => setTimeout(r, 700));
      setState("done");
      requestAnimationFrame(() => successRef.current?.focus());
      return;
    }

    try {
      const f = brevo.fields;
      const body = new FormData();
      body.append(f.firstName, values.firstName.trim());
      body.append(f.lastName, values.lastName.trim());
      body.append(f.dateOfBirth, values.dateOfBirth.trim());
      body.append(f.guardian, values.guardian.trim());
      body.append(f.address, values.address.trim());
      body.append(f.email, values.email.trim());
      body.append(f.phone, values.phone.trim());
      body.append(f.inquiryType, values.inquiryType);
      body.append(f.urgency, values.urgency);
      body.append(f.preferredContact, values.preferredContact);
      body.append(f.servicesNeeded, values.servicesNeeded.join(", "));
      body.append(f.schedule, values.schedule.trim());
      body.append(f.message, values.message.trim());
      body.append(brevo.honeypotField, "");
      body.append("locale", brevo.locale);

      // Brevo's hosted-form endpoint does not send CORS headers, so the
      // response is opaque by design. A resolved promise means the request
      // reached Brevo; there is no way to read a status code back.
      await fetch(brevo.formAction, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      setState("done");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      console.error("[contact form] submission failed", err);
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div
        className="form-success is-visible"
        ref={successRef}
        tabIndex={-1}
        role="status"
      >
        <svg
          className="form-success__arc"
          viewBox="0 0 120 66"
          fill="none"
          aria-hidden="true"
        >
          {[
            ["var(--band-red)", 54],
            ["var(--band-orange)", 46],
            ["var(--band-yellow)", 38],
            ["var(--band-green)", 30],
            ["var(--band-sky)", 22],
            ["var(--band-violet)", 14],
          ].map(([stroke, r]) => (
            <path
              key={r}
              d={`M ${60 - r} 60 A ${r} ${r} 0 0 1 ${60 + r} 60`}
              stroke={stroke}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <h3 className="form-success__title">Thank you — your message is with us.</h3>
        <p className="form-success__body">
          A member of the care team will call you back{" "}
          {values.urgency === "As soon as possible"
            ? "today if you sent this during office hours, and first thing tomorrow otherwise"
            : "within one business day"}
          . If you would rather talk right now, call{" "}
          <a href={contact.phoneHref}>
            <Ph>{contact.phone}</Ph>
          </a>
          .
        </p>
        {previewMode && (
          <p className="form__status is-visible" data-tone="info">
            Preview mode — nothing was actually sent. Add your Brevo form URL to{" "}
            <code>brevo.formAction</code> in <code>src/config/site.js</code>.
          </p>
        )}
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setValues(EMPTY);
            setErrors({});
            setState("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className={`form${state === "submitting" ? " form-submitting" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="privacy-note">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3l7 3v5.5c0 4.2-2.9 8.1-7 9.5-4.1-1.4-7-5.3-7-9.5V6l7-3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 12.2l1.8 1.8 3.4-3.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>
          This form is not a secure medical channel. Tell us the situation in
          general terms and leave out diagnoses, medications and record numbers —
          we will gather that safely once we speak.
        </p>
      </div>

      <p className="form__section">Client</p>

      <div className="form__row form__row--split">
        <Field
          name="firstName"
          label="First name"
          value={values.firstName}
          error={errors.firstName}
          onChange={update("firstName")}
          autoComplete="given-name"
          required
        />
        <Field
          name="lastName"
          label="Last name"
          value={values.lastName}
          error={errors.lastName}
          onChange={update("lastName")}
          autoComplete="family-name"
          required
        />
      </div>

      <Field
        name="dateOfBirth"
        label="Date of birth"
        value={values.dateOfBirth}
        error={errors.dateOfBirth}
        onChange={update("dateOfBirth")}
        autoComplete="bday"
        placeholder="MM / DD / YYYY"
        required
      />

      <Field
        name="guardian"
        label="Parent or legal guardian"
        value={values.guardian}
        error={errors.guardian}
        onChange={update("guardian")}
        placeholder="First and last name"
        required
      />

      <Field
        name="address"
        as="textarea"
        label="Full address, including county"
        value={values.address}
        error={errors.address}
        onChange={update("address")}
        autoComplete="street-address"
        placeholder="Street, city, state, ZIP — and which county"
        rows={3}
        required
      />

      <div className="form__row form__row--split">
        <Field
          name="email"
          type="email"
          label="Email"
          optional
          value={values.email}
          error={errors.email}
          onChange={update("email")}
          autoComplete="email"
          inputMode="email"
        />
        <Field
          name="phone"
          type="tel"
          label="Phone"
          value={values.phone}
          error={errors.phone}
          onChange={update("phone")}
          autoComplete="tel"
          inputMode="tel"
          placeholder="(407) 555-0100"
          required
        />
      </div>

      <div className="form__row form__row--split">
        <Field
          name="inquiryType"
          as="select"
          label="What do you need help with?"
          value={values.inquiryType}
          error={errors.inquiryType}
          onChange={update("inquiryType")}
          required
        >
          <option value="">Choose one…</option>
          {inquiryTypes.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Field>

        <Field
          name="urgency"
          as="select"
          label="How soon do you need to start?"
          optional
          value={values.urgency}
          error={errors.urgency}
          onChange={update("urgency")}
        >
          <option value="">Choose one…</option>
          {urgencyOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Field>
      </div>

      <fieldset className="fieldset">
        <legend className="field__label">How should we reach you?</legend>
        <div className="checks checks--inline">
          {["Phone call", "Text message", "Email"].map((opt) => (
            <label className="check" key={opt}>
              <input
                className="check__box"
                type="radio"
                name="preferredContact"
                value={opt}
                checked={values.preferredContact === opt}
                onChange={update("preferredContact")}
              />
              <span className="check__text">{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset
        className={`fieldset${errors.servicesNeeded ? " has-error" : ""}`}
        aria-describedby={errors.servicesNeeded ? "services-error" : undefined}
      >
        <legend className="field__label">Services needed</legend>
        <p className="field__hint" style={{ marginBottom: "0.75rem" }}>
          Check all that apply.
        </p>

        <div className="checks">
          {serviceOptions.map((opt) => (
            <label className="check" key={opt}>
              <input
                className="check__box"
                type="checkbox"
                name="servicesNeeded"
                value={opt}
                checked={values.servicesNeeded.includes(opt)}
                onChange={toggleService(opt)}
              />
              <span className="check__text">{opt}</span>
            </label>
          ))}
        </div>

        {errors.servicesNeeded && (
          <span
            className="field__error"
            id="services-error"
            role="alert"
            style={{ display: "flex", marginTop: "0.5rem" }}
          >
            {errors.servicesNeeded}
          </span>
        )}
      </fieldset>

      <Field
        name="schedule"
        as="textarea"
        label="Which days and times are you requesting services?"
        value={values.schedule}
        error={errors.schedule}
        onChange={update("schedule")}
        placeholder="For example: Monday–Friday 2pm–5pm, Saturdays 1pm–6pm"
        rows={3}
      />

      <Field
        name="message"
        as="textarea"
        label="Additional comments"
        optional
        value={values.message}
        error={errors.message}
        onChange={update("message")}
        rows={4}
      />

      {/* Brevo's bot trap. Off-screen rather than hidden, so bots still fill it. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={brevo.honeypotField}>Leave this field empty</label>
        <input
          ref={honeypotRef}
          id={brevo.honeypotField}
          name={brevo.honeypotField}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div aria-live="polite">
        {state === "failed" && (
          <p className="form__status is-visible" data-tone="error">
            That did not go through — most likely a dropped connection. Try once
            more, or call us on <Ph>{contact.phone}</Ph> and we will take the
            details over the phone.
          </p>
        )}
        {previewMode && state === "idle" && (
          <p className="form__status is-visible" data-tone="info">
            Preview mode: the form validates but sends nothing until a Brevo form
            URL is added to <code>src/config/site.js</code>.
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="btn btn--primary btn--block"
          disabled={state === "submitting"}
        >
          <span className="spinner" aria-hidden="true" />
          {state === "submitting" ? "Sending…" : "Send message"}
        </button>
        {/* The client asked for the consent tickbox to go. Keeping the notice
            as plain text preserves the disclosure without the extra step. */}
        <p className="field__hint" style={{ marginTop: "0.85rem" }}>
          We reply to every message within one business day. By sending this you
          agree that a member of the care team may contact you about it — we
          never sell your details, and you can ask us to stop at any time.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  name,
  label,
  as = "input",
  type = "text",
  value,
  error,
  onChange,
  optional = false,
  required = false,
  children,
  ...rest
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const Tag = as;

  const shared = {
    className: "field__input",
    id,
    name,
    value,
    onChange,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? errorId : undefined,
    "aria-required": required || undefined,
    ...rest,
  };

  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional && <span className="field__optional">optional</span>}
      </label>

      <div className="field__control">
        {/* input is a void element, so children are only ever handed to
            select and textarea. */}
        {as === "input" ? (
          <input {...shared} type={type} />
        ) : (
          <Tag {...shared}>{children}</Tag>
        )}
      </div>

      {error && (
        <span className="field__error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
