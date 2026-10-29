"use client";

import Link from "next/link";
import Logo from "../Logo";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  navLinks: NavLink[];
}

export default function MobileNavDrawer({
  isOpen,
  onClose,
  pathname,
  navLinks,
}: MobileNavDrawerProps) {
  return (
    <>
      {/* Mobile Nav Backdrop */}
      <div
        className={`mobile-nav-backdrop${isOpen ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Nav Drawer */}
      <div
        className={`mobile-nav-drawer${isOpen ? " open" : ""}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Κύρια πλοήγηση"
      >
        {/* Drawer Header */}
        <div className="mnd-header">
          <div className="mnd-brand">
            <Logo size="sm" />
          </div>
          <button className="mnd-close" onClick={onClose} aria-label="Κλείσιμο μενού">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mnd-nav" aria-label="Κύρια πλοήγηση">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`mnd-link${pathname === link.href ? " active" : ""}${link.href === "/contact" ? " mnd-cta" : ""}`}
              aria-current={pathname === link.href ? "page" : undefined}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="mnd-icon">
                {link.href === "/" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2" />
                  </svg>
                )}
                {link.href === "/services" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
                {link.href === "/projects" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                )}
                {link.href === "/contact" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </span>
              <span className="mnd-label">{link.label}</span>
              <svg
                className="mnd-chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="mnd-footer">
          <div className="mnd-divider" />
          <a href="tel:+306981772698" className="mnd-contact-item">
            <svg
              className="mnd-contact-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <div>
              <span className="mnd-contact-label">Τηλέφωνο</span>
              <span className="mnd-contact-val">698 177 2698</span>
            </div>
          </a>
          <a href="mailto:info@dimeras.gr" className="mnd-contact-item">
            <svg
              className="mnd-contact-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
            </svg>
            <div>
              <span className="mnd-contact-label">Email</span>
              <span className="mnd-contact-val">info@dimeras.gr</span>
            </div>
          </a>
          <p className="mnd-copy">© {new Date().getFullYear()} DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε.</p>
        </div>
      </div>
    </>
  );
}

