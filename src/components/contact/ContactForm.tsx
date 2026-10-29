"use client";

import { useState, useEffect, FormEvent } from "react";
import CustomSelect from "@/components/ui/CustomSelect";

interface ContactFormProps {
  idPrefix?: string;
}

export default function ContactForm({ idPrefix = "" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (status === "success" || status === "error") {
      timeoutId = setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get("website")) {
      setStatus("success");
      setStatusMessage("Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.");
      return;
    }

    const data = {
      name: (formData.get("name") as string) || "",
      phone: (formData.get("phone") as string) || "",
      email: (formData.get("email") as string) || "",
      type: (formData.get("type") as string) || "",
      message: (formData.get("message") as string) || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMessage("Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.");
        form.reset();
      } else {
        setStatus("error");
        setStatusMessage(result.error || "Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Σφάλμα σύνδεσης. Παρακαλώ δοκιμάστε ξανά ή καλέστε μας στο 698 177 2698.");
    }
  }

  const p = idPrefix ? `${idPrefix}-` : "";

  return (
    <div className="form-card">
      <div className="form-card-title">Αίτημα προσφοράς</div>
      <div className="form-card-subtitle">
        Συμπληρώστε τα στοιχεία σας και θα σας απαντήσουμε εντός 24 ωρών.
      </div>

      <form className="contact-form" id={`${p}quote-form`} onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input name="name" required autoComplete="name" placeholder=" " id={`${p}field-name`} />
          <label htmlFor={`${p}field-name`}>Ονοματεπώνυμο</label>
        </div>
        <div className="form-group">
          <input
            name="phone"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder=" "
            id={`${p}field-phone`}
          />
          <label htmlFor={`${p}field-phone`}>Τηλέφωνο</label>
        </div>
        <div className="form-group">
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder=" "
            id={`${p}field-email`}
          />
          <label htmlFor={`${p}field-email`}>Email</label>
        </div>
        <div className="form-group">
          <CustomSelect
            name="type"
            id={`${p}field-type`}
            label="Είδος έργου"
            defaultValue="Νέα κατασκευή"
            options={["Νέα κατασκευή", "Ανακαίνιση", "Δημόσιο / επαγγελματικό έργο", "Άλλο"]}
          />
        </div>
        <div className="form-group wide">
          <textarea
            name="message"
            rows={4}
            placeholder=" "
            id={`${p}field-message`}
          ></textarea>
          <label htmlFor={`${p}field-message`}>Σύντομη περιγραφή</label>
        </div>

        {/* Honeypot */}
        <input type="text" name="website" className="ohnohoney" tabIndex={-1} autoComplete="off" />

        <button
          className={`btn-submit${status === "loading" ? " loading" : ""}`}
          type="submit"
          disabled={status === "loading"}
        >
          Αποστολή αιτήματος
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>

        {status !== "idle" && status !== "loading" && (
          <div className={`form-status ${status}`} aria-live="polite">
            {statusMessage}
          </div>
        )}

        <p className="form-note" aria-live="polite">
          Τα στοιχεία σας αποστέλλονται απευθείας σε εμάς και δεν κοινοποιούνται σε τρίτους.
        </p>
      </form>
    </div>
  );
}

