import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Company from "@/components/Company";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Company />
        <Services />
        <Approach />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
