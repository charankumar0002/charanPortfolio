import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // ✅ Import ScrollToPlugin
import AboutSection from "./components/AboutSection";
import CustomCursor from "./common/CustomCursor";
import EnhancedHeroSection from "./components/EnhancedHeroSection";
import AnimatedBackground from "./components/AnimatedBackground";
import ParticleSystem from "./components/ParticleSystem";
import InteractiveShapes from "./components/InteractiveShapes";
import ScrollProgress from "./common/ScrollProgress";
import Skills from "./components/Skills";

import WorkExperience from "./components/WorkExperience";
import ProjectsSection from "./components/ProjectsSection";
import Header from "./common/Header";
import FooterSection from "./components/FooterSection";
import ContactPage from "./components/contact";
import { Analytics } from '@vercel/analytics/react';
import SEO from "./common/SEO";
// ✅ Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // ✅ Add ScrollToPlugin

function App() {
  useEffect(() => {
    // Set up smooth scrolling
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    // Initialize main timeline
    const mainTl = gsap.timeline({
      defaults: {
        ease: "power2.out", // Consistent easing
      },
    });

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      mainTl.kill();
    };
  }, []);

  const scrollToAbout = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: "#about", // Ensure this ID matches the AboutSection's ID
      ease: "linear",
    });
  };
  
  return (
    <>
      <SEO
        title="Palukuru Charan Kumar Reddy | Software Developer"
        description="Portfolio of Palukuru Charan Kumar Reddy, a Software Developer with ~2.7 years experience building user-friendly and responsive web applications using React, Next.js, and TypeScript."
        keywords="Software Developer, React, Next.js, TypeScript, Performance Optimization, Bengaluru, Tailwind CSS, Redux Toolkit"
      />
      <AnimatedBackground />
      <ParticleSystem />
      <InteractiveShapes />
      <Header />
      <div className="relative">
        <ScrollProgress />
        <CustomCursor />
        <EnhancedHeroSection onExploreClick={scrollToAbout} />
        <AboutSection id="about"  />
        <WorkExperience id="experience"/>
        <ProjectsSection />
        <Skills id="skills" />
        <ContactPage id="contact" />
        <FooterSection id="footer"/>
        <Analytics />
      </div>
    </>
  );
}

export default App;
