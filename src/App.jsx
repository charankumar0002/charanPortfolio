import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SlideInComponent from './SliderAnimation/SliderAnimation'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="min-h-screen bg-gray-100">
      <div className="w-full h-screen flex items-center justify-center bg-blue-100">
        <SlideInComponent />
      </div>
      <div className="h-screen bg-green-100">
        <SlideInComponent />
      </div>
      <div className="h-screen bg-red-100">
        <SlideInComponent />
      </div>
      {/* Adding some space between components so you can scroll */}
      <div className="h-100 bg-gray-300"></div>
    </div>
    </>
  )
}

export default App
