"use client";

import { useEffect, useRef, useState } from "react";

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
        </div>
      </div>
    </section>
  );
}
