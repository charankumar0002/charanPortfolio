import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import SEO from "./common/SEO";
import Header from "./common/Header";
import EnhancedHeroSection from "./components/EnhancedHeroSection";
import AboutSection from "./components/AboutSection";
import WorkExperience from "./components/WorkExperience";
import ProjectsSection from "./components/ProjectsSection";
import Skills from "./components/Skills";
import ContactPage from "./components/contact";
import FooterSection from "./components/FooterSection";

function App() {
  // Sections render after the browser tries to follow a #hash, so jump to it ourselves.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <SEO
        title="Palukuru Charan Kumar Reddy | Full Stack Developer"
        description="Portfolio of Palukuru Charan Kumar Reddy, a Full Stack Developer with 3+ years of experience building high-performance web applications with React, Next.js, TypeScript, Node.js, FastAPI, Azure and Docker."
        keywords="Full Stack Developer, React, Next.js, TypeScript, Node.js, FastAPI, Azure, AWS, Docker, MQTT, PostgreSQL, MSSQL, CI/CD, Bengaluru"
      />
      <div className="page-bg" aria-hidden="true" />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Header />
      <main className="overflow-x-clip">
        <EnhancedHeroSection />
        <AboutSection id="about" />
        <WorkExperience id="experience" />
        <ProjectsSection />
        <Skills id="skills" />
        <ContactPage id="contact" />
      </main>
      <FooterSection id="footer" />
      <Analytics />
    </>
  );
}

export default App;
