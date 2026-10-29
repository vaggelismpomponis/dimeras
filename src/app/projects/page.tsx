import type { Metadata } from "next";
import ProjectsPageHero from "@/components/ProjectsPageHero";
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
      <ProjectsPageHero />
      <ProjectsGallery />
    </main>
  );
}
