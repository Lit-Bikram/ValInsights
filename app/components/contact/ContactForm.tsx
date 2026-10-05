"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const enquiryTypes = [
  "Valuation assignment",
  "Transaction",
  "Financial reporting",
  "Dispute or litigation",
  "Other requirement",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      organisation: String(formData.get("organisation") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      requirementType: String(formData.get("requirement") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to submit your enquiry.");
      }

      form.reset();
      setFormState("success");
    } catch (error) {
      console.error("Contact form submission error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your enquiry. Please try again.",
      );
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <span className="contact-form-success__mark">✓</span>
        <p className="contact-label">Enquiry received</p>
        <h3>Thank you for contacting us.</h3>
        <p>
          Your requirement has been received. Our team will review the details
          and get back to you.
        </p>
        <button
          type="button"
          className="contact-form__button"
          onClick={() => setFormState("idle")}
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>
        <span className="contact-form__label-text">
          Full Name <span aria-hidden="true">*</span>
        </span>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={120}
        />
      </label>

      <label>
        <span className="contact-form__label-text">
          Professional Email <span aria-hidden="true">*</span>
        </span>
        <input
          type="email"
          name="email"
          placeholder="name@company.com"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>

      <label>
        <span className="contact-form__label-text">
          Requirement Area <span aria-hidden="true">*</span>
        </span>
        <select name="requirement" defaultValue="Valuation assignment" required>
          <option value="" disabled>
            Select an area
          </option>
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="contact-form__label-text">
          Assignment Details <span aria-hidden="true">*</span>
        </span>
        <textarea
          name="message"
          rows={6}
          placeholder="Briefly describe your valuation requirement, reporting framework, or transaction scope..."
          required
          minLength={10}
          maxLength={5000}
        />
      </label>

      {/* Keep the existing honeypot bot protection. */}
      <label className="contact-form__honeypot" aria-hidden="true">
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      {formState === "error" && (
        <p className="contact-form__error" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="contact-form__button"
        disabled={formState === "submitting"}
      >
        {formState === "submitting" ? "Submitting…" : "Submit Requirement"}
      </button>
    </form>
  );
}
