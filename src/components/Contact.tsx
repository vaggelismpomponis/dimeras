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

const ClockIcon = () => (
  <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8" />
    <path d="M10 6v4l3 3" />
  </svg>
);

interface ContactProps {
  /** When true the component is on its own /contact page.
   *  It hides the old left-col intro (tag + h2 + p) which would
   *  duplicate the PageHero, and instead shows a side-panel with
   *  contact details next to the form. */
  standalone?: boolean;
}

function CustomSelect({ name, id, options, defaultValue, label }: { name: string, id: string, options: string[], defaultValue: string, label: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={wrapperRef}>
      <input type="hidden" name={name} value={selected} id={id} />
      <div 
        className={`custom-select-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {selected}
      </div>
      <label htmlFor={id} className="custom-select-label">{label}</label>
      <div className={`custom-select-dropdown ${isOpen ? "open" : ""}`}>
        {options.map((opt) => (
          <div 
            key={opt}
            className={`custom-select-option ${selected === opt ? "selected" : ""}`}
            onClick={() => {
              setSelected(opt);
              setIsOpen(false);
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Contact({ standalone = false }: ContactProps) {
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

  /* ── STANDALONE layout (/contact page) ──────────────────
     Row 1: Title (left) & Form Card (right)
     Row 2: Contact Details (left) & Google Map (right)        */
  if (standalone) {
    return (
      <section className="contact-standalone-page" id="contact" ref={sectionRef}>
        {/* ROW 1: Title Left & Form Right */}
        <div className="contact-top-row">
          <div className={`contact-title-col reveal${isRevealed ? " visible" : ""}`}>
            <p className="eyebrow">ΕΠΙΚΟΙΝΩΝΙΑ</p>
            <h1>
              Έχετε ένα έργο
              <br />
              <em>στο μυαλό σας;</em>
            </h1>
            <p className="contact-title-sub">
              Περιγράψτε μας το έργο σας και θα επικοινωνήσουμε μαζί σας σύντομα για αυτοψία και αναλυτική προσφορά.
            </p>

            <div className="contact-highlights">
              <div className="contact-highlight-item">
                <span className="ch-icon">✓</span>
                <div>
                  <strong>Άμεση ανταπόκριση</strong>
                  <small>Επικοινωνία εντός 24 ωρών</small>
                </div>
              </div>
              <div className="contact-highlight-item">
                <span className="ch-icon">✓</span>
                <div>
                  <strong>Δωρεάν αυτοψία</strong>
                  <small>Επιτόπια εκτίμηση στο χώρο σας</small>
                </div>
              </div>
              <div className="contact-highlight-item">
                <span className="ch-icon">✓</span>
                <div>
                  <strong>Γραπτή προσφορά</strong>
                  <small>Αναλυτικός προϋπολογισμός και χρονοδιάγραμμα</small>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card (Top Right) */}
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
                <input name="name" required autoComplete="name" placeholder=" " id="field-name" />
                <label htmlFor="field-name">Ονοματεπώνυμο</label>
              </div>
              <div className="form-group">
                <input name="phone" required inputMode="tel" autoComplete="tel" placeholder=" " id="field-phone" />
                <label htmlFor="field-phone">Τηλέφωνο</label>
              </div>
              <div className="form-group">
                <input name="email" type="email" autoComplete="email" placeholder=" " id="field-email" />
                <label htmlFor="field-email">Email</label>
              </div>
              <div className="form-group">
                <CustomSelect
                  name="type"
                  id="field-type"
                  label="Είδος έργου"
                  defaultValue="Νέα κατασκευή"
                  options={["Νέα κατασκευή", "Ανακαίνιση", "Μόνωση ή επισκευή", "Δημόσιο / επαγγελματικό έργο", "Άλλο"]}
                />
              </div>
              <div className="form-group wide">
                <textarea name="message" rows={4} placeholder=" " id="field-message"></textarea>
                <label htmlFor="field-message">Σύντομη περιγραφή</label>
              </div>

              {/* Honeypot */}
              <input type="text" name="website" className="ohnohoney" tabIndex={-1} autoComplete="off" />

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
        </div>

        {/* ROW 2: Contact Details Left & Google Map Right */}
        <div className="contact-bottom-row">
          {/* Left — Contact Details Panel */}
          <div className={`contact-panel reveal${isRevealed ? " visible" : ""}`}>
            <div className="contact-panel-title">Στοιχεία επικοινωνίας</div>

            <div className="contact-panel-items">
              <div className="contact-panel-item">
                <PersonIcon />
                <div>
                  <small>ΥΠΕΥΘΥΝΟΣ</small>
                  <span>Δημέρας Νικόλαος του Παύλου</span>
                </div>
              </div>
              <div className="contact-panel-item">
                <PhoneIcon />
                <div>
                  <small>ΤΗΛΕΦΩΝΟ</small>
                  <a href="tel:+306981772698">698 177 2698</a>
                </div>
              </div>
              <div className="contact-panel-item">
                <EmailIcon />
                <div>
                  <small>EMAIL</small>
                  <a href="mailto:dimerasnikos@hotmail.com">dimerasnikos@hotmail.com</a>
                </div>
              </div>
              <div className="contact-panel-item">
                <LocationIcon />
                <div>
                  <small>ΕΔΡΑ</small>
                  <a
                    href="https://maps.google.com/?q=Στρατηγού+Φράγκου+26-30,+Λάρισα"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Στρατηγού Φράγκου 26–30<br />Λάρισα 41222
                  </a>
                </div>
              </div>
              <div className="contact-panel-item">
                <ClockIcon />
                <div>
                  <small>ΩΡΑΡΙΟ</small>
                  <span>Δευτ – Παρ, 08:00 – 18:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Google Map */}
          <div className={`contact-map-col reveal reveal-delay-1${isRevealed ? " visible" : ""}`}>
            <div className="contact-map-header">
              <div className="contact-map-title">
                <LocationIcon />
                <span>Τοποθεσία και Έδρα — Λάρισα</span>
              </div>
            </div>
            <div className="contact-map-frame">
              <iframe
                src="https://maps.google.com/maps?q=Στρατηγού+Φράγκου+26-30,+Λάρισα&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Τοποθεσία DN GROUP στους Χάρτες Google"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── EMBEDDED layout (homepage section) ───────────────────── */
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
            <input name="name" required autoComplete="name" placeholder=" " id="field-name" />
            <label htmlFor="field-name">Ονοματεπώνυμο</label>
          </div>
          <div className="form-group">
            <input name="phone" required inputMode="tel" autoComplete="tel" placeholder=" " id="field-phone" />
            <label htmlFor="field-phone">Τηλέφωνο</label>
          </div>
          <div className="form-group">
            <input name="email" type="email" autoComplete="email" placeholder=" " id="field-email" />
            <label htmlFor="field-email">Email</label>
          </div>
          <div className="form-group">
            <CustomSelect
              name="type"
              id="field-type-2"
              label="Είδος έργου"
              defaultValue="Νέα κατασκευή"
              options={["Νέα κατασκευή", "Ανακαίνιση", "Μόνωση ή επισκευή", "Δημόσιο / επαγγελματικό έργο", "Άλλο"]}
            />
          </div>
          <div className="form-group wide">
            <textarea name="message" rows={4} placeholder=" " id="field-message"></textarea>
            <label htmlFor="field-message">Σύντομη περιγραφή</label>
          </div>

          {/* Honeypot */}
          <input type="text" name="website" className="ohnohoney" tabIndex={-1} autoComplete="off" />

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
