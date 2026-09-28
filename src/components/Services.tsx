"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    num: "01",
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
    num: "02",
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
    num: "03",
    title: "Μονώσεις και επισκευές",
    desc: "Στεγανοποίηση, θερμομόνωση και αποκατάσταση φθορών για αξιόπιστη προστασία του κτιρίου.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="14" width="36" height="28" rx="2" />
        <path d="M6 22h36" />
        <path d="M6 30h36" />
        <path d="M6 38h36" />
        <path d="M14 6l10 8L34 6" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Σχολικά και τεχνικά έργα",
    desc: "Εμπειρία σε ανακαινίσεις σχολικών μονάδων, δημόσιους και επαγγελματικούς χώρους, με έμφαση στις προδιαγραφές, την ασφάλεια και το χρονοδιάγραμμα.",
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
          <div className="section-tag light"><span className="tag-num">02</span> ΥΠΗΡΕΣΙΕΣ</div>
          <h2>
            Ολοκληρωμένες τεχνικές
            <br />
            λύσεις, σε κάθε κλίμακα.
          </h2>
        </div>
      )}

      <div className="bento-grid">
        {services.map((svc, i) => (
          <article
            key={svc.num}
            className={`bento-card reveal reveal-delay-${i + 1}${isRevealed ? " visible" : ""}`}
          >
            <span className="bento-card-num">{svc.num}</span>
            <div className="bento-card-icon">{svc.icon}</div>
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
