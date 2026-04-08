import Hero from "../components/landing/Hero";
import Programs from "../components/landing/Programs";
import PortalCards from "../components/landing/PortalCards";
import CtaSection from "../components/landing/CtaSection";
import StatsBand from "../components/landing/StatsBand";
import TryoutInterest from "../components/landing/TryoutInterest";
import ContactSection from "../components/landing/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Programs />
      <PortalCards />
      <TryoutInterest />
      <ContactSection />
      <CtaSection />
    </>
  );
}
