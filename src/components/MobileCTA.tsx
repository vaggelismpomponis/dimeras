"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Don't show on the contact page itself
  const isContactPage = pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (100vh)
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isContactPage) return null;

  return (
    <div className={`mobile-cta${visible ? " visible" : ""}`} aria-hidden={!visible}>
      <Link className="btn primary" href="/contact">
        Ζητήστε προσφορά
      </Link>
    </div>
  );
}
