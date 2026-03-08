import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import ProgrammingShowcase from "@/components/ProgrammingShowcase";
import WorkSection from "@/components/WorkSection";
import SystemsSection from "@/components/SystemsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgrammingShowcase />
      <WorkSection />
      <LogoCloud />
      <AboutSection />
      <ContactSection />
    </>
  );
}
