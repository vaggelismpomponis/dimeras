import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Υπηρεσίες | DN GROUP — Κατασκευαστική Εταιρεία Λάρισα",
  description:
    "Νεόδμητα κτίρια, ανακαινίσεις κατοικιών και τεχνικά έργα από την ΔΗΜΕΡΑΣ Ε.Ε. — DN GROUP στη Λάρισα.",
  alternates: {
    canonical: "/services",
  },
};

export default function YpiriesiesPage() {
  return (
    <main>
      <PageHero
        tag="ΥΠΗΡΕΣΙΕΣ"
        title="Ολοκληρωμένες τεχνικές"
        titleEm="λύσεις, σε κάθε κλίμακα."
        subtitle="Από τη θεμελίωση ενός νεόδμητου κτιρίου έως τη λεπτομέρεια μιας ανακαίνισης — αναλαμβάνουμε κάθε έργο με την ίδια επαγγελματική συνέπεια."
      />
      <Services standalone />
    </main>
  );
}
