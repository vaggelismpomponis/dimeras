import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Επικοινωνία | DN GROUP — Κατασκευαστική Εταιρεία Λάρισα",
  description:
    "Επικοινωνήστε με την ΔΗΜΕΡΑΣ Ε.Ε. — DN GROUP για αυτοψία και αναλυτική προσφορά. Τηλ: 698 177 2698 | Λάρισα.",
  alternates: {
    canonical: "/contact",
  },
};

export default function EpikoinoniaPage() {
  return (
    <main>
      <PageHero
        tag="ΕΠΙΚΟΙΝΩΝΙΑ"
        title="Έχετε ένα έργο"
        titleEm="στο μυαλό σας;"
        subtitle="Περιγράψτε μας το έργο σας και θα επικοινωνήσουμε μαζί σας σύντομα για αυτοψία και αναλυτική προσφορά."
      />
      <Contact standalone />
    </main>
  );
}
