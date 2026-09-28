"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="counter-value">
      {count}{suffix}
    </span>
  );
}

export default function Company() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="statement" id="company" ref={sectionRef}>
      <div className="statement-inner">
        {/* Left — Pull Quote */}
        <div className={`statement-left reveal${isRevealed ? " visible" : ""}`}>
          <div className="section-tag"><span className="tag-num">01</span> Η ΕΤΑΙΡΕΙΑ</div>
          <h2 className="statement-quote">
            Τεχνική γνώση.
            <br />
            Σωστή οργάνωση.
            <br />
            <span>Έργα με διάρκεια.</span>
          </h2>
        </div>

        {/* Right — Body */}
        <div className="statement-right">
          <p className={`reveal reveal-delay-1${isRevealed ? " visible" : ""}`}>
            Η <strong>ΔΗΜΕΡΑΣ Ε.Ε.</strong>, με διακριτικό τίτλο{" "}
            <strong>DN GROUP</strong>, δραστηριοποιείται στον κατασκευαστικό
            κλάδο από το <strong>2006</strong>, διαθέτοντας πολυετή εμπειρία στην
            κατασκευή κτιρίων και στην ολοκληρωμένη εκτέλεση ιδιωτικών και
            επαγγελματικών έργων.
          </p>
          <p className={`reveal reveal-delay-2${isRevealed ? " visible" : ""}`}>
            Αναλαμβάνουμε την κατασκευή νεόδμητων κτιρίων, ολοκληρωμένες
            ανακαινίσεις κατοικιών και επαγγελματικών χώρων, αποκαταστάσεις
            κτιρίων και ειδικές τεχνικές εργασίες, από τον αρχικό σχεδιασμό και
            την οργάνωση έως την πλήρη παράδοση του έργου.
          </p>
          <p className={`reveal reveal-delay-3${isRevealed ? " visible" : ""}`}>
            Σημαντικό μέρος της εμπειρίας μας αποτελεί η συμμετοχή μας, ως
            συνεργαζόμενη τεχνική εταιρεία, στην υλοποίηση εργασιών ανακαίνισης
            και αναβάθμισης σχολικών μονάδων στο πλαίσιο του προγράμματος{" "}
            <strong>«Μαριέττα Γιαννάκου»</strong>.
          </p>
          <p className={`reveal reveal-delay-4${isRevealed ? " visible" : ""}`}>
            Η εταιρεία μας συμμετείχε σε δύο περιόδους εργασιών, αναλαμβάνοντας
            την οργάνωση, τον συντονισμό και την εκτέλεση των παρεμβάσεων που της
            ανατέθηκαν. Όλες οι εργασίες ολοκληρώθηκαν με συνέπεια, σύμφωνα με
            τις προβλεπόμενες τεχνικές προδιαγραφές και εντός των απαιτούμενων
            χρονοδιαγραμμάτων.
          </p>
        </div>
      </div>

      {/* Animated Counters */}
      <div className={`counters-bar reveal reveal-delay-3${isRevealed ? " visible" : ""}`}>
        <div className="counter-item">
          <AnimatedCounter end={2006} />
          <div className="counter-label">Έτος Ίδρυσης</div>
        </div>
        <div className="counter-item">
          <AnimatedCounter end={20} suffix="+" />
          <div className="counter-label">Χρόνια Εμπειρίας</div>
        </div>
        <div className="counter-item">
          <AnimatedCounter end={150} suffix="+" />
          <div className="counter-label">Ολοκληρωμένα Έργα</div>
        </div>
      </div>
    </section>
  );
}
