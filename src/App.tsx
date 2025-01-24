import { useEffect } from 'react';
import AboutSection from "./components/AboutSection"
import CustomCursor from "./components/CustomCursor"
// import FirstPage from "./components/FirstPage"
import HeroSection from "./components/HeroSection"
import ScrollIndicator from "./components/ScrollIndicator"
import ScrollProgress from "./components/ScrollProgress"


function App() {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <div className="relative">
        <ScrollProgress />
        <CustomCursor />
        <HeroSection onExploreClick={scrollToAbout} />
        <AboutSection id="about" />
        {/* Other sections */}
      </div>
    </>
  );
}

export default App
