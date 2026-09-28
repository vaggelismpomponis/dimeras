"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomeContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-cta" ref={ref}>
      <div className={`home-cta-inner reveal${isRevealed ? " visible" : ""}`}>
        <div className="home-cta-text">
          <p className="eyebrow-dark">ΕΠΙΚΟΙΝΩΝΙΑ</p>
          <h2>Έχετε ένα έργο<br /><em>στο μυαλό σας;</em></h2>
          <p className="home-cta-sub">
            Επικοινωνήστε μαζί μας για αυτοψία και αναλυτική προσφορά.
            Απαντάμε εντός 24 ωρών.
          </p>
        </div>
        <div className="home-cta-actions">
          <Link className="btn primary" href="/contact">
            Ζητήστε προσφορά
          </Link>
          <a className="btn ghost" href="tel:+306981772698">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4.5C3 3.67 3.67 3 4.5 3h2.09a1 1 0 01.97.76l.7 3.18a1 1 0 01-.5 1.1l-1.3.66a10 10 0 004.84 4.84l.65-1.3a1 1 0 011.1-.5l3.19.7a1 1 0 01.76.97v2.09c0 .83-.67 1.5-1.5 1.5C8.82 17 3 11.18 3 4.5z" />
            </svg>
            698 177 2698
          </a>
        </div>
      </div>
    </section>
  );
}
