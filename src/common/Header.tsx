import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollToPlugin);

const sectionIds = ["hero", "about", "experience", "skills", "contact"];

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
    <header className="bg-slate-900 text-white shadow-lg w-[60vw] mx-auto mt-2 rounded-xl sticky top-2 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection("hero")}> 
          <img src="/CharanLogo.png" alt="Logo of Palukuru Charan Kumar Reddy" className="w-[120px] h-[40px]" />
        </div>
        <nav className="hidden md:flex space-x-6" aria-label="Main navigation">
          <button onClick={() => scrollToSection("about")} className={activeSection === "about" ? "text-blue-400 font-bold" : "hover:text-blue-200"} aria-current={activeSection === "about" ? "page" : undefined}>
            About
          </button>
          <button onClick={() => scrollToSection("experience")} className={activeSection === "experience" ? "text-blue-400 font-bold" : "hover:text-blue-200"} aria-current={activeSection === "experience" ? "page" : undefined}>
            Experience
          </button>
          <button onClick={() => scrollToSection("skills")} className={activeSection === "skills" ? "text-blue-400 font-bold" : "hover:text-blue-200"} aria-current={activeSection === "skills" ? "page" : undefined}>
            Skills
          </button>
          <button onClick={() => scrollToSection("contact")} className={activeSection === "contact" ? "text-blue-400 font-bold" : "hover:text-blue-200"} aria-current={activeSection === "contact" ? "page" : undefined}>
            Contact
          </button>
        </nav>
        <button onClick={toggleTheme} className="hidden md:block ml-4" aria-label="Toggle theme">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen} aria-controls="mobile-menu">
          {isOpen ? "✖️" : "☰"}
        </button>
      </div>
      <div id="mobile-menu" className={`md:hidden px-4 pb-4 space-y-2 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`} aria-hidden={!isOpen}>
        <button onClick={() => scrollToSection("about")} className={activeSection === "about" ? "block w-full text-left py-2 text-blue-400 font-bold" : "block w-full text-left py-2 hover:text-blue-200"} aria-current={activeSection === "about" ? "page" : undefined}>
          About
        </button>
        <button onClick={() => scrollToSection("experience")} className={activeSection === "experience" ? "block w-full text-left py-2 text-blue-400 font-bold" : "block w-full text-left py-2 hover:text-blue-200"} aria-current={activeSection === "experience" ? "page" : undefined}>
          Experience
        </button>
        <button onClick={() => scrollToSection("skills")} className={activeSection === "skills" ? "block w-full text-left py-2 text-blue-400 font-bold" : "block w-full text-left py-2 hover:text-blue-200"} aria-current={activeSection === "skills" ? "page" : undefined}>
          Skills
        </button>
        <button onClick={() => scrollToSection("contact")} className={activeSection === "contact" ? "block w-full text-left py-2 text-blue-400 font-bold" : "block w-full text-left py-2 hover:text-blue-200"} aria-current={activeSection === "contact" ? "page" : undefined}>
          Contact
        </button>
        <button onClick={toggleTheme} className="block w-full text-left py-2 hover:text-blue-200" aria-label="Toggle theme">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
