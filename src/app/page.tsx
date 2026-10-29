import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Company from "@/components/Company";
import Services from "@/components/Services";
import HomeProjectsShowcase from "@/components/HomeProjectsShowcase";
import Approach from "@/components/Approach";
import HomeContactCTA from "@/components/HomeContactCTA";

export const metadata: Metadata = {
  title: "DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε. | Ριζικές Ανακαινίσεις και Ολοκληρωμένα Ιδιωτικά Έργα",
  description:
    "Ανεξάρτητη τεχνική και κατασκευαστική εταιρεία με έδρα τη Λάρισα υπό τη διοίκηση του Νικολάου Δημερά. Ριζικές ανακαινίσεις, ανακατασκευές κτιρίων & ολοκληρωμένα ιδιωτικά έργα από το 2006.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Company />
      <Services />
      <HomeProjectsShowcase />
      <Approach />
      <HomeContactCTA />
    </main>
  );
}
