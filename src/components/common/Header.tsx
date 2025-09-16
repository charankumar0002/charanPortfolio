import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollToPlugin);

const sectionIds = ["hero", "about", "highlights", "experience", "skills", "contact"];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("hero");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 0.2,
      scrollTo: {
        y: `#${id}`,
        offsetY: 50, // Adjust for fixed headers
      },
      ease: "linear",
    });
    setIsOpen(false);
  };

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-slate-900/95 backdrop-blur-lg text-white shadow-xl w-[98vw] sm:w-[95vw] md:w-[85vw] lg:w-[60vw] mx-auto mt-1 sm:mt-2 rounded-lg sm:rounded-xl sticky top-1 sm:top-2 z-50 transition-all border border-white/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 flex justify-between items-center">
        <div className="text-lg sm:text-xl md:text-2xl font-bold cursor-pointer" onClick={() => scrollToSection("hero")}> 
          <img src="/CharanLogo.png" alt="Palukuru Charan Kumar Reddy logo" className="w-[70px] h-[22px] sm:w-[80px] sm:h-[26px] md:w-[100px] md:h-[32px] lg:w-[120px] lg:h-[40px]" width={120} height={40} decoding="async" />
        </div>
        <nav className="hidden md:flex space-x-3 lg:space-x-6" aria-label="Main navigation">
          <button onClick={() => scrollToSection("about")} className={activeSection === "about" ? "text-cyan-400 font-bold px-3 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "hover:text-cyan-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5"} aria-current={activeSection === "about" ? "page" : undefined}>
            About
          </button>
          <button onClick={() => scrollToSection("highlights")} className={activeSection === "highlights" ? "text-cyan-400 font-bold px-3 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "hover:text-cyan-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5"} aria-current={activeSection === "highlights" ? "page" : undefined}>
            Highlights
          </button>
          <button onClick={() => scrollToSection("experience")} className={activeSection === "experience" ? "text-cyan-400 font-bold px-3 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "hover:text-cyan-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5"} aria-current={activeSection === "experience" ? "page" : undefined}>
            Experience
          </button>
          <button onClick={() => scrollToSection("skills")} className={activeSection === "skills" ? "text-cyan-400 font-bold px-3 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "hover:text-cyan-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5"} aria-current={activeSection === "skills" ? "page" : undefined}>
            Skills
          </button>
          <button onClick={() => scrollToSection("contact")} className={activeSection === "contact" ? "text-cyan-400 font-bold px-3 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "hover:text-cyan-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5"} aria-current={activeSection === "contact" ? "page" : undefined}>
            Contact
          </button>
        </nav>
        <button onClick={toggleTheme} className="hidden md:block ml-3 lg:ml-4 p-2 rounded-lg hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20" aria-label="Toggle theme">
          <span className="text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </button>
        <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen} aria-controls="mobile-menu">
          <span className="text-xl">{isOpen ? "✖️" : "≡"}</span>
        </button>
      </div>
      <div id="mobile-menu" className={`md:hidden px-2 sm:px-3 md:px-4 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 pb-3 sm:pb-4' : 'max-h-0 opacity-0 pointer-events-none'}`} aria-hidden={!isOpen}>
        <div className="space-y-1 border-t border-white/10 pt-2 sm:pt-3">
          <button onClick={() => scrollToSection("about")} className={activeSection === "about" ? "block w-full text-left py-3 px-3 text-cyan-400 font-bold rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "block w-full text-left py-3 px-3 hover:text-cyan-300 hover:bg-white/5 transition-all duration-300 rounded-lg border border-transparent hover:border-white/10"} aria-current={activeSection === "about" ? "page" : undefined}>
            About
          </button>
          <button onClick={() => scrollToSection("highlights")} className={activeSection === "highlights" ? "block w-full text-left py-3 px-3 text-cyan-400 font-bold rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "block w-full text-left py-3 px-3 hover:text-cyan-300 hover:bg-white/5 transition-all duration-300 rounded-lg border border-transparent hover:border-white/10"} aria-current={activeSection === "highlights" ? "page" : undefined}>
            Highlights
          </button>
          <button onClick={() => scrollToSection("experience")} className={activeSection === "experience" ? "block w-full text-left py-3 px-3 text-cyan-400 font-bold rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "block w-full text-left py-3 px-3 hover:text-cyan-300 hover:bg-white/5 transition-all duration-300 rounded-lg border border-transparent hover:border-white/10"} aria-current={activeSection === "experience" ? "page" : undefined}>
            Experience
          </button>
          <button onClick={() => scrollToSection("skills")} className={activeSection === "skills" ? "block w-full text-left py-3 px-3 text-cyan-400 font-bold rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "block w-full text-left py-3 px-3 hover:text-cyan-300 hover:bg-white/5 transition-all duration-300 rounded-lg border border-transparent hover:border-white/10"} aria-current={activeSection === "skills" ? "page" : undefined}>
            Skills
          </button>
          <button onClick={() => scrollToSection("contact")} className={activeSection === "contact" ? "block w-full text-left py-3 px-3 text-cyan-400 font-bold rounded-lg bg-cyan-400/10 border border-cyan-400/30" : "block w-full text-left py-3 px-3 hover:text-cyan-300 hover:bg-white/5 transition-all duration-300 rounded-lg border border-transparent hover:border-white/10"} aria-current={activeSection === "contact" ? "page" : undefined}>
            Contact
          </button>
          <button onClick={toggleTheme} className="block w-full text-left py-3 px-3 hover:text-cyan-300 hover:bg-white/5 transition-all duration-300 rounded-lg border border-transparent hover:border-white/10" aria-label="Toggle theme">
            <span className="inline-flex items-center gap-2">
              <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
              <span>Toggle Theme</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
