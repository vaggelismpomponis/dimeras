"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Αυτοψία και κατανόηση",
    desc: "Καταγράφουμε τις πραγματικές ανάγκες και τις τεχνικές ιδιαιτερότητες του έργου.",
  },
  {
    num: "02",
    title: "Αναλυτική προσφορά",
    desc: "Παρουσιάζουμε σαφές αντικείμενο εργασιών, προτεινόμενα υλικά και οικονομική ανάλυση.",
  },
  {
    num: "03",
    title: "Οργάνωση και κατασκευή",
    desc: "Συντονίζουμε συνεργεία, προμήθειες και εφαρμογές με διαρκή τεχνική επίβλεψη.",
  },
  {
    num: "04",
    title: "Παράδοση και υποστήριξη",
    desc: "Παραδίδουμε ολοκληρωμένο αποτέλεσμα και παραμένουμε δίπλα στον πελάτη μετά το έργο.",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeItems, setActiveItems] = useState<boolean[]>(new Array(steps.length).fill(false));

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Timeline animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the timeline is visible
      const timelineTop = rect.top;
      const timelineHeight = rect.height;
      const visibleFromTop = Math.max(0, viewportHeight * 0.5 - timelineTop);
      const progress = Math.min(1, Math.max(0, visibleFromTop / timelineHeight));

      setLineHeight(progress * 100);

      // Activate individual items
      const items = timeline.querySelectorAll(".timeline-item");
      
      setActiveItems(prev => {
        const newActive = [...prev];
        let changed = false;
        items.forEach((item, i) => {
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < viewportHeight * 0.65 && !newActive[i]) {
            newActive[i] = true;
            changed = true;
          }
        });
        return changed ? newActive : prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="approach" id="approach" ref={sectionRef}>
      <div className={`approach-title reveal${isRevealed ? " visible" : ""}`}>
        <h2>
          Ένα έργο.
          <br />
          Μία υπεύθυνη
          <br />
          <span>ομάδα.</span>
        </h2>
      </div>

      <ol className="timeline" ref={timelineRef}>
        <div
          className="timeline-line-fill"
          style={{ height: `${lineHeight}%` }}
          aria-hidden="true"
        ></div>
        {steps.map((step, i) => (
          <li
            key={step.num}
            className={`timeline-item reveal reveal-delay-${i + 1}${isRevealed ? " visible" : ""}${activeItems[i] ? " active" : ""}`}
          >
            <div className="timeline-node">{step.num}</div>
            <div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
