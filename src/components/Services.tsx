"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ServicePoint {
  label: string;
  text: string;
}

interface ServiceItem {
  title: string;
  desc?: string;
  points?: ServicePoint[];
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    title: "Ριζικές Ανακαινίσεις Κατοικιών",
    desc: "Ολική ανακαίνιση διαμερισμάτων και μονοκατοικιών με σύγχρονο αρχιτεκτονικό σχεδιασμό, λειτουργικές λύσεις και ποιοτική κατασκευή σε κάθε λεπτομέρεια.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 42V20l16-12 16 12v22H8z" />
        <path d="M20 42V32h8v10" />
        <path d="M32 8h6v8" />
        <circle cx="24" cy="24" r="3" />
      </svg>
    ),
  },
  {
    title: "Ολοκληρωμένες Ανακατασκευές Κτιρίων",
    desc: "Πλήρης ανακατασκευή, στατική και λειτουργική αναβάθμιση υφιστάμενων κτιρίων, με ενδελεχή τεχνική μελέτη και υπεύθυνη επίβλεψη.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 42h36" />
        <path d="M12 42V10h24v32" />
        <path d="M18 16h4v4h-4zM26 16h4v4h-4zM18 24h4v4h-4zM26 24h4v4h-4z" />
        <path d="M20 42v-8h8v8" />
        <path d="M6 16l6-6" />
        <path d="M42 16l-6-6" />
      </svg>
    ),
  },
  {
    title: "Ανακαινίσεις Επενδυτικών Ακινήτων",
    desc: "Στοχευμένες διαμορφώσεις ακινήτων με γνώμονα τη μέγιστη απόδοση επένδυσης, ιδανικές για πώληση, μακροχρόνια εκμίσθωση ή τουριστική αξιοποίηση (Airbnb).",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 40h32" />
        <path d="M12 40V22l12-8 12 8v18" />
        <path d="M24 14v-6l8 4" />
        <path d="M20 30h8" />
        <path d="M24 26v8" />
        <circle cx="24" cy="30" r="6" />
      </svg>
    ),
  },
  {
    title: "Αναβαθμίσεις και Ανακατασκευές Πολυκατοικιών",
    desc: "Εκτεταμένες επεμβάσεις σε πολυκατοικίες: θερμοπροσόψεις, ενεργειακή αναβάθμιση, ανακαίνιση εισόδων, κλιμακοστασίων και στεγανοποιήσεις δωμάτων.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 42h36" />
        <path d="M10 42V14l14-6 14 6v28" />
        <path d="M16 20h4v4h-4zM28 20h4v4h-4zM16 28h4v4h-4zM28 28h4v4h-4z" />
        <path d="M20 42v-6h8v6" />
      </svg>
    ),
  },
  {
    title: "Ανέγερση Νέων Ιδιωτικών Κτιρίων",
    desc: "Ολοκληρωμένη κατασκευή ιδιωτικών κατοικιών και κτιριακών έργων από τη θεμελίωση έως τα κλειδιά στο χέρι, με συντονισμό όλων των εξειδικευμένων συνεργείων.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 42h36" />
        <path d="M10 42V18l14-10 14 10v24" />
        <path d="M20 42V30h8v12" />
        <path d="M18 22h2v2h-2zM28 22h2v2h-2z" />
        <path d="M18 28h2" />
        <path d="M28 28h2" />
      </svg>
    ),
  },
];

export default function Services({ standalone = false }: { standalone?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
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

  return (
    <section className={`services${standalone ? " services--standalone" : ""}`} id="services" ref={sectionRef}>
      {!standalone && (
        <div className={`services-header reveal${isRevealed ? " visible" : ""}`}>
          <div className="services-header-main">
            <span className="services-eyebrow">ΤΟΜΕΙΣ ΔΡΑΣΤΗΡΙΟΤΗΤΑΣ • ΛΑΡΙΣΑ, ΘΕΣΣΑΛΙΑ &amp; ΑΤΤΙΚΗ</span>
            <h2>
              Ολοκληρωμένα ιδιωτικά <em>κατασκευαστικά έργα.</em>
            </h2>
          </div>
          <Link href="/services" className="services-header-link">
            <span>Όλες οι Υπηρεσίες</span>
            <span className="shl-arrow" aria-hidden="true">➔</span>
          </Link>
        </div>
      )}

      {standalone ? (
        <div className="services-standalone-grid">
          {services.map((svc, i) => (
            <article
              key={svc.title}
              className={`service-arch-card reveal reveal-delay-${i + 1}${isRevealed ? " visible" : ""}`}
            >
              <div className="sac-top-bar">
                <div className="sac-icon-box" aria-hidden="true">
                  {svc.icon}
                </div>
              </div>

              <div className="sac-content">
                <h2 className="sac-title">{svc.title}</h2>
                {svc.desc && <p className="sac-desc">{svc.desc}</p>}
                {svc.points && svc.points.length > 0 && (
                  <ul className="sac-points-list">
                    {svc.points.map((pt, idx) => (
                      <li key={idx}>
                        <span className="sac-bullet" aria-hidden="true">•</span>
                        <span>
                          <strong>{pt.label}</strong> {pt.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="sac-footer">
                <Link
                  href={`/contact?type=${encodeURIComponent(svc.title)}`}
                  className="sac-cta-link"
                >
                  <span>Ζητήστε Προσφορά</span>
                  <span className="sac-arrow" aria-hidden="true">➔</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="services-home-showcase">
          {services.map((svc, i) => (
            <Link
              key={svc.title}
              href="/services"
              className={`service-home-row reveal reveal-delay-${i + 1}${isRevealed ? " visible" : ""}`}
            >
              <div className="shr-title-col">
                <div className="shr-icon-box" aria-hidden="true">
                  {svc.icon}
                </div>
                <h3 className="shr-title">{svc.title}</h3>
              </div>

              <div className="shr-desc-col">
                {svc.desc && <p className="shr-desc">{svc.desc}</p>}
                {svc.points && svc.points.length > 0 && (
                  <ul className="shr-points-list">
                    {svc.points.map((pt, idx) => (
                      <li key={idx}>
                        <span className="shr-bullet" aria-hidden="true">•</span>
                        <span>
                          <strong>{pt.label}</strong> {pt.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="shr-action-col" aria-hidden="true">
                <span className="shr-arrow-btn">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
