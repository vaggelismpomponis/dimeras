"use client";

import { useEffect, useState } from "react";

interface PageHeroProps {
  tag: string;
  title: string;
  titleEm?: string;
  subtitle: string;
}

export default function PageHero({ tag, title, titleEm, subtitle }: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className={`page-hero${mounted ? " mounted" : ""}`}>
      <div className="page-hero-content">
        <p className="eyebrow">{tag}</p>
        <h1>
          {title}{" "}
          {titleEm && (
            <>
              <br className="page-hero-br" />
              <em>{titleEm}</em>
            </>
          )}
        </h1>
        <p className="page-hero-sub">{subtitle}</p>
      </div>
      <div className="page-hero-bar" aria-hidden="true" />
    </section>
  );
}
