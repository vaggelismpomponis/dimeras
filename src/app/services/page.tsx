import type { Metadata } from "next";
import ServicesPageHero from "@/components/ServicesPageHero";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Υπηρεσίες | DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε. | Λάρισα, Θεσσαλία, Αττική",
  description:
    "Ριζικές ανακαινίσεις κατοικιών, ανακατασκευές κτιρίων, ανακαινίσεις επενδυτικών ακινήτων, πολυκατοικίες και ανέγερση νέων ιδιωτικών κτιρίων από την DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε.",
  alternates: {
    canonical: "/services",
  },
};

export default function YpiriesiesPage() {
  return (
    <main>
      <ServicesPageHero />
      <Services standalone />
    </main>
  );
}
