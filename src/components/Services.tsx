"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import ServiceArchCard from "./services/ServiceArchCard";
import ServiceHomeRow from "./services/ServiceHomeRow";

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
      <section
        className={`services${standalone ? " services--standalone" : ""}`}
        id="services"
        ref={sectionRef}
      >
        {!standalone && (
          <div className={`services-header reveal${isRevealed ? " visible" : ""}`}>
            <div className="services-header-main">
              <span className="services-eyebrow">
                ΤΟΜΕΙΣ ΔΡΑΣΤΗΡΙΟΤΗΤΑΣ • ΛΑΡΙΣΑ, ΘΕΣΣΑΛΙΑ &amp; ΑΤΤΙΚΗ
              </span>
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
                {servicesData.map((svc, i) => (
                  <ServiceArchCard
                    key={svc.title}
              service = { svc }
              index = { i }
              isRevealed = { isRevealed }
                  />
          ))}
          </div>
        ) : (
          <div className="services-home-showcase">
                {servicesData.map((svc, i) => (
                  <ServiceHomeRow
                    key={svc.title}
              service = { svc }
              index = { i }
              isRevealed = { isRevealed }
                  />
          ))}
          </div>
        )}
      </section>
      );
}
