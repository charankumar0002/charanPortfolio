import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // ✅ Import ScrollToPlugin
import AboutSection from "./components/AboutSection";
import CustomCursor from "./common/CustomCursor";
import EnhancedHeroSection from "./components/EnhancedHeroSection";
import OptimizedAnimatedBackground from "./components/OptimizedAnimatedBackground";
import OptimizedParticleSystem from "./components/OptimizedParticleSystem";
import OptimizedInteractiveShapes from "./components/OptimizedInteractiveShapes";
import OptimizedScrollProgress from "./common/OptimizedScrollProgress";
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
    // Enhanced GSAP performance configuration
    gsap.config({
      autoSleep: 30, // Reduced from 60 for faster cleanup
      force3D: true, // Hardware acceleration
      nullTargetWarn: false,
    });

    // Mobile-specific performance optimizations
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Reduce animation complexity for mobile
      gsap.config({
        autoSleep: 20,
        force3D: true,
        nullTargetWarn: false,
      });
      
      // Shorter durations for mobile
      gsap.defaults({
        ease: "power2.out",
        duration: 0.6,
        overwrite: "auto",
      });
    } else {
      // Set global defaults for better performance on desktop
      gsap.defaults({
        ease: "power2.out",
        duration: 0.8,
        overwrite: "auto", // Prevent conflicting animations
      });
    }

    // Initialize main timeline with performance optimizations
    const mainTl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    // Enhanced scroll trigger configuration for performance
    ScrollTrigger.config({
      limitCallbacks: true, // Limit callback frequency
      syncInterval: isMobile ? 150 : 120, // Higher sync interval for mobile
    });

    // Clean up function with proper cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      mainTl.kill();
      gsap.killTweensOf("*"); // Kill all remaining tweens
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
      <OptimizedAnimatedBackground />
      <OptimizedParticleSystem />
      <OptimizedInteractiveShapes />
      <Header />
      <div className="relative overflow-x-hidden">
        <OptimizedScrollProgress />
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
