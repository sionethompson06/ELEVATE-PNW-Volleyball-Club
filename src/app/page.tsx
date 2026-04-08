import Hero from "../components/landing/Hero";
import WhyElevate from "../components/landing/WhyElevate";
import AboutSection from "../components/landing/AboutSection";
import Programs from "../components/landing/Programs";
import CoachesSection from "../components/landing/CoachesSection";
import FamiliesSection from "../components/landing/FamiliesSection";
import TryoutInterest from "../components/landing/TryoutInterest";
import ContactSection from "../components/landing/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyElevate />
      <AboutSection />
      <Programs />
      <CoachesSection />
      <FamiliesSection />
      <TryoutInterest />
      <ContactSection />
    </>
  );
}
