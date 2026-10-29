import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Επικοινωνία | DN GROUP — Κατασκευαστική Εταιρεία Λάρισα",
  description:
    "Επικοινωνήστε με την ΔΗΜΕΡΑΣ Ε.Ε. — DN GROUP για αυτοψία και αναλυτική προσφορά. Τηλ: 698 177 2698 | Λάρισα.",
  alternates: {
    canonical: "/contact",
  },
};

export default function EpikoinoniaPage() {
  return <ContactPage />;
}
