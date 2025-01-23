import AboutSection from "./components/AboutSection"
import CustomCursor from "./components/CustomCursor"
// import FirstPage from "./components/FirstPage"
import HeroSection from "./components/HeroSection"
import ScrollIndicator from "./components/ScrollIndicator"
import ScrollProgress from "./components/ScrollProgress"


function App() {


  return (
    <>
    <div className="relative">
    <ScrollProgress />
      <CustomCursor />
      <HeroSection />
      <AboutSection />
      {/* Other sections */}
    </div>
    </>
  )
}

export default App
