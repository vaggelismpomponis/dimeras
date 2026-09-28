import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGallery from "@/components/ProjectsGallery";

export const metadata: Metadata = {
  title: "Έργα μας | DN GROUP — Κατασκευαστική Εταιρεία Λάρισα",
  description:
    "Δείτε επιλεγμένα έργα της ΔΗΜΕΡΑΣ Ε.Ε. — DN GROUP: νέες κατασκευές, ανακαινίσεις κατοικιών και τεχνικά έργα στη Λάρισα και τη Θεσσαλία.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ErgaPage() {
  return (
    <main>
      <PageHero
        tag="ΤΑ ΕΡΓΑ ΜΑΣ"
        title="Δουλειά που"
        titleEm="μιλάει μόνη της."
        subtitle="Επιλεγμένα έργα από το χαρτοφυλάκιό μας — νέες κατασκευές, ανακαινίσεις και τεχνικά έργα σε Λάρισα και Θεσσαλία."
      />
      <ProjectsGallery />
    </main>
  );
}
