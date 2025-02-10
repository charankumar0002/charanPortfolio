import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AboutSection from "./components/AboutSection";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import ScrollProgress from "./components/ScrollProgress";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
        ease: "power2.out",
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
      scrollTo: {
        y: "#about",
        offsetY: 0,
      },
      ease: "power4.inOut",
    });
  };

  return (
    <>
      <div className="relative">
        <ScrollProgress />
        <CustomCursor />
        <HeroSection onExploreClick={scrollToAbout} />
        <AboutSection id="about"  />
        <WorkExperience />
        <Skills />
      </div>
    </>
  );
}

export default App;