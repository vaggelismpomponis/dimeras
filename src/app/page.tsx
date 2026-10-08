import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Company from "@/components/Company";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import HomeContactCTA from "@/components/HomeContactCTA";

export const metadata: Metadata = {
  title: "DN GROUP | ΔΗΜΕΡΑΣ— Κατασκευαστική Εταιρεία Λάρισα",
  description:
    "Η ΔΗΜΕΡΑΣ — DN GROUP αναλαμβάνει νέες κατασκευές, ανακαινίσεις, μονώσεις και τεχνικά έργα στη Λάρισα από το 2006.",
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
      <Approach />
      <HomeContactCTA />
    </main>
  );
}
