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
    title: "Νεόδμητα κτίρια",
    desc: "Ολοκληρωμένη κατασκευή κατοικιών και κτιρίων από τη θεμελίωση έως την παράδοση, με συντονισμό όλων των συνεργείων και εργασιών.",
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
  {
    title: "Ανακαινίσεις κατοικιών",
    desc: "Ολική ή μερική ανακαίνιση κατοικιών και επαγγελματικών χώρων με λειτουργικό σχεδιασμό, τεχνική συνέπεια και ποιοτική εφαρμογή.",
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
    title: "Δημόσια Κτιριακά Έργα",
    points: [
      {
        label: "Πρόγραμμα «Μαριέττα Γιαννάκου»:",
        text: "Συμμετοχή ως συνεργαζόμενη τεχνική εταιρεία στην ανακαίνιση και αναβάθμιση σχολικών μονάδων.",
      },
      {
        label: "Δύο περίοδοι εργασιών:",
        text: "Πλήρης ανάληψη οργάνωσης, συντονισμού και εκτέλεσης των παρεμβάσεων.",
      },
      {
        label: "Τεχνική συνέπεια:",
        text: "Ολοκλήρωση σύμφωνα με τις προβλεπόμενες προδιαγραφές και τα χρονοδιαγράμματα.",
      },
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l20-12 20 12" />
        <path d="M8 22v14c0 2 4 6 16 6s16-4 16-6V22" />
        <path d="M44 20v16" />
        <circle cx="44" cy="38" r="2" />
        <path d="M24 20v8" />
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
            <h2>
              Ολοκληρωμένες τεχνικές <em>λύσεις, σε κάθε κλίμακα.</em>
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
