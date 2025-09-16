import { Suspense, lazy, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // ✅ Import ScrollToPlugin
import AboutSection from "./components/AboutSection";
import CustomCursor from "./components/common/CustomCursor";
import EnhancedHeroSection from "./components/EnhancedHeroSection";
import OptimizedScrollProgress from "./components/common/OptimizedScrollProgress";
import Skills from "./components/Skills";

import WorkExperience from "./components/WorkExperience";
import ProjectsSection from "./components/ProjectsSection";
import Header from "./components/common/Header";
import FooterSection from "./components/FooterSection";
import ContactSection from "./components/ContactSection.tsx";
import { Analytics } from '@vercel/analytics/react';
import SEO from "./components/common/SEO";
import PerformanceMonitor from "./components/PerformanceMonitor";
import { shouldDisableHeavyEffects, hasFinePointer } from "./utils/prefs";
import Highlights from "./components/Highlights";

// Lazy-load heavy background visuals
const OptimizedAnimatedBackground = lazy(() => import("./components/OptimizedAnimatedBackground"));
const OptimizedParticleSystem = lazy(() => import("./components/OptimizedParticleSystem"));
const OptimizedInteractiveShapes = lazy(() => import("./components/OptimizedInteractiveShapes"));
// ✅ Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // ✅ Add ScrollToPlugin

function App() {
  const [showPerf, setShowPerf] = useState(false);
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
      <Suspense fallback={null}>
        {!shouldDisableHeavyEffects() && <OptimizedAnimatedBackground />}
        {!shouldDisableHeavyEffects() && <OptimizedParticleSystem />}
        {!shouldDisableHeavyEffects() && <OptimizedInteractiveShapes />}
      </Suspense>
      <Header />
      <main className="relative overflow-x-hidden" id="hero" role="main">
        <OptimizedScrollProgress />
        {hasFinePointer() && <CustomCursor />}
        <EnhancedHeroSection onExploreClick={scrollToAbout} />
        <AboutSection id="about"  />
  <Highlights id="highlights" />
        <WorkExperience id="experience"/>
        <ProjectsSection />
        <Skills id="skills" />
  <ContactSection id="contact" />
        <FooterSection id="footer"/>
        <Analytics />
        {showPerf && <PerformanceMonitor enabled />}
        {/* Quick toggle for perf HUD (press `)` key) */}
        <TogglePerf onToggle={() => setShowPerf((s)=>!s)} active={showPerf} />
      </main>
    </>
  );
}

export default App;

// Inline lightweight toggle to avoid extra file
function TogglePerf({ onToggle, active }: { onToggle: () => void; active: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ')' || e.key === '0') onToggle();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onToggle]);
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      title="Toggle performance HUD (press 0)"
      className="fixed bottom-4 right-4 z-50 text-xs px-2 py-1 rounded bg-black/60 border border-white/10 text-white hover:bg-black/80"
    >
      Perf: {active ? 'On' : 'Off'}
    </button>
  );
}
