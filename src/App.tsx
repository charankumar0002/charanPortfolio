import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // ✅ Import ScrollToPlugin
import AboutSection from "./components/AboutSection";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import ScrollProgress from "./components/ScrollProgress";
import Skills from "./components/Skills";
import Header from "./common/Header";
import ExperienceSection from "./components/WorkExperience";

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
      ease: "power4.inOut",
    });
  };
  
  return (
    <>
      <Header />
      <div className="relative">
        <ScrollProgress />
        <CustomCursor />
        <HeroSection onExploreClick={scrollToAbout} />
        <AboutSection id="about" />
        <ExperienceSection id="experience" />
        <Skills id="skills" />
      </div>
    </>
  );
}

export default App;
