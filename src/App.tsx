import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // ✅ Import ScrollToPlugin
import AboutSection from "./components/AboutSection";
import CustomCursor from "./common/CustomCursor";
import HeroSection from "./components/HeroSection";
import ScrollProgress from "./common/ScrollProgress";
import Skills from "./components/Skills";
import Header from "./common/Header";
import ExperienceSection from "./components/WorkExperience";
import FooterSection from "./components/FooterSection";
import ContactPage from "./components/contact";

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
      <Header />
      <div className="relative">
        <ScrollProgress />
        <CustomCursor />
        <HeroSection onExploreClick={scrollToAbout} />
        <AboutSection id="about" />
        <ExperienceSection id="experience" />
        <Skills id="skills" />
        <ContactPage id="contact" />
        <FooterSection id="footer"/>
      </div>
    </>
  );
}

export default App;
