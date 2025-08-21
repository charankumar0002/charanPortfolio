import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface TypingAnimationProps {
  texts: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenTexts?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  className = '',
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenTexts = 2000
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText !== fullText) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenTexts);
        }
      } else {
        if (currentText !== '') {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typeSpeed, deleteSpeed, delayBetweenTexts]);

  useEffect(() => {
    // Animate cursor blinking
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <span className={className}>
      <span ref={textRef}>{currentText}</span>
      <span 
        ref={cursorRef}
        className="ml-1 text-cyan-400 font-bold text-xl"
      >
        |
      </span>
    </span>
  );
};

export default TypingAnimation;
