import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
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
      <PageHero
        tag="ΥΠΗΡΕΣΙΕΣ"
        title="Ολοκληρωμένα ιδιωτικά"
        titleEm="κατασκευαστικά έργα."
        subtitle="Ριζικές ανακαινίσεις κατοικιών, ανακατασκευές κτιρίων, επενδυτικά ακίνητα και ανέγερση νέων κτιρίων σε Λάρισα, Θεσσαλία και Αττική με υπεύθυνη επίβλεψη και σαφή προϋπολογισμό."
      />
      <Services standalone />
    </main>
  );
}
