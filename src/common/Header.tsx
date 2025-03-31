import React, { useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      ease: "linear", // More linear start, reducing lag
    });
    setIsOpen(false); // Close menu after clicking (for mobile)
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg w-[60vw] mx-auto mt-2 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection("hero")}>
          PCKR
        </div>
        <nav className="hidden md:flex space-x-6">
          <button onClick={() => scrollToSection("about")} className="hover:text-blue-200">
            About
          </button>
          <button onClick={() => scrollToSection("experience")} className="hover:text-blue-200">
            Experience
          </button>
          <button onClick={() => scrollToSection("skills")} className="hover:text-blue-200">
            Skills
          </button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-blue-200">
            Contact
          </button>
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? "✖️" : "☰"}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <button onClick={() => scrollToSection("about")} className="block w-full text-left py-2 hover:text-blue-200">
            About
          </button>
          <button onClick={() => scrollToSection("experience")} className="block w-full text-left py-2 hover:text-blue-200">
            Experience
          </button>
          <button onClick={() => scrollToSection("skills")} className="block w-full text-left py-2 hover:text-blue-200">
            Skills
          </button>
          <button onClick={() => scrollToSection("contact")} className="block w-full text-left py-2 hover:text-blue-200">
            Contact
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
