import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import  { useRef } from 'react'
import "./FirstPage.css"
function FirstPage() {
  
  
  const nameRef = useRef([]);
  const detailsRef = useRef(null);

 
  useGSAP(() => {
    const timeline = gsap.timeline();

    // Animate the large first letter
    timeline.to(nameRef.current[0], {
      fontSize: "20rem",  // Increase size
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    })
    .to(nameRef.current[0], {
      fontSize: "5rem",
      opacity: 1,
      duration: 2,
      x: 200,  // Move to the right
      ease: "back.out"
    })
    .to(nameRef.current, {
      x: 200,
      opacity: 1,  // Reveal other letters
      stagger: 0.2,
      duration: 0.5,
      ease: "power3.out",
    })
    .to(detailsRef.current, {
      x: 200,
      opacity: 1,  // Show details after letters
      duration: 1,
      delay: 0.5,  // Delay to match the timing
    });
  }, { scope: nameRef });

  return (
    <div className='firstPage-container'>
     <div className="name-container">
      <h1>
        {"CHARAN".split("").map((letter, index) => (
          <span
            key={index}
            ref={(el) => (nameRef.current[index] = el)}
            className="letter"
            style={{ opacity: 0, fontSize: "5rem", display: "inline-block" }}
          >
            {letter}
          </span>
        ))}
      </h1>
      <div className="details" ref={detailsRef} style={{ opacity: 0 }}>
        <p>Front-End Developer | React Enthusiast</p>
      </div>
    </div>
    </div>
  );
};

export default FirstPage
