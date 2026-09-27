"use client";

import { useEffect, useRef, useState, FormEvent } from "react";

/* SVG Icons for contact details */
const PersonIcon = () => (
  <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="6" r="3.5" />
    <path d="M3 18c0-3.5 3-6 7-6s7 2.5 7 6" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4.5C3 3.67 3.67 3 4.5 3h2.09a1 1 0 01.97.76l.7 3.18a1 1 0 01-.5 1.1l-1.3.66a10 10 0 004.84 4.84l.65-1.3a1 1 0 011.1-.5l3.19.7a1 1 0 01.76.97v2.09c0 .83-.67 1.5-1.5 1.5C8.82 17 3 11.18 3 4.5z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="16" height="12" rx="2" />
    <path d="M2 6l8 5 8-5" />
  </svg>
);

const LocationIcon = () => (
  <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 18s-6-5.69-6-9.5A6 6 0 0116 8.5C16 12.31 10 18 10 18z" />
    <circle cx="10" cy="8.5" r="2" />
  </svg>
);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            entry.target.querySelectorAll(".reveal").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Check honeypot
    if (formData.get("website")) {
      setStatus("success");
      setStatusMessage("Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.");
      return;
    }

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || "",
      type: formData.get("type") as string,
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

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      {/* Left — Info */}
      <div className={`contact-info reveal${isRevealed ? " visible" : ""}`}>
        <div className="section-tag light"><span className="tag-num">04</span> ΕΠΙΚΟΙΝΩΝΙΑ</div>
        <h2>Έχετε ένα έργο στο μυαλό σας;</h2>
        <p>
          Περιγράψτε μας το έργο σας και θα επικοινωνήσουμε μαζί σας για αυτοψία
          και αναλυτική προσφορά.
        </p>

      </div>

      {/* Right — Form Card */}
      <div className={`form-card reveal reveal-delay-1${isRevealed ? " visible" : ""}`}>
        <div className="form-card-title">Αίτημα προσφοράς</div>
        <div className="form-card-subtitle">
          Συμπληρώστε τα στοιχεία σας και θα σας απαντήσουμε εντός 24 ωρών.
        </div>

        <form
          className="contact-form"
          id="quote-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <input
              name="name"
              required
              autoComplete="name"
              placeholder=" "
              id="field-name"
            />
            <label htmlFor="field-name">Ονοματεπώνυμο</label>
          </div>
          <div className="form-group">
            <input
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder=" "
              id="field-phone"
            />
            <label htmlFor="field-phone">Τηλέφωνο</label>
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder=" "
              id="field-email"
            />
            <label htmlFor="field-email">Email</label>
          </div>
          <div className="form-group">
            <select name="type" defaultValue="Νέα κατασκευή" id="field-type">
              <option>Νέα κατασκευή</option>
              <option>Ανακαίνιση</option>
              <option>Μόνωση ή επισκευή</option>
              <option>Δημόσιο / επαγγελματικό έργο</option>
              <option>Άλλο</option>
            </select>
            <label htmlFor="field-type">Είδος έργου</label>
          </div>
          <div className="form-group wide">
            <textarea
              name="message"
              rows={4}
              placeholder=" "
              id="field-message"
            ></textarea>
            <label htmlFor="field-message">Σύντομη περιγραφή</label>
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            className="ohnohoney"
            tabIndex={-1}
            autoComplete="off"
          />

          <button
            className={`btn-submit${status === "loading" ? " loading" : ""}`}
            type="submit"
            disabled={status === "loading"}
          >
            Αποστολή αιτήματος
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    </section>
  );
}
