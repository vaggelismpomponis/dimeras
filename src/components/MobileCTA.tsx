"use client";

import { useEffect, useState } from "react";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (100vh)
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`mobile-cta${visible ? " visible" : ""}`} aria-hidden={!visible}>
      <a className="btn primary" href="#contact">
        Ζητήστε προσφορά
      </a>
    </div>
  );
}
