import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([nameRef.current, titleRef.current, detailsRef.current, ctaRef.current], {
      opacity: 0,
      y: 50
    });

    // Animation sequence
    tl.to('.loader', {
      height: '0%',
      duration: 1.5,
      ease: 'power4.inOut'
    })
    .from('.background-gradient', {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to(nameRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    })
    .to(nameRef.current, {
      x: '-30vw',
      scale: 0.8,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .to('.detail-item', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power2.out'
    })
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');

    // Animate background particles
    gsap.to('.particle', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'none',
      stagger: {
        amount: 2,
        from: 'random'
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Loading screen */}
      <div className="loader absolute inset-0 bg-purple-900 z-50" />

      {/* Background gradient */}
      <div className="background-gradient absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-50" />

      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto">
          {/* Name */}
          <div ref={nameRef} className="text-center">
            <h1 className="text-6xl font-bold text-white tracking-tighter">
              Palukuru Charan Kumar Reddy
            </h1>
          </div>

          {/* Title */}
          <div ref={titleRef} className="text-right mt-8">
            <h2 className="text-4xl font-light text-white/90">
              Creative Developer
            </h2>
          </div>

          {/* Details */}
          <div ref={detailsRef} className="mt-12 flex flex-col items-end space-y-4">
            {[
              { text: "Frontend Development", icon: "🎨" },
              { text: "Interactive Experiences", icon: "✨" },
              { text: "Creative Coding", icon: "💻" },
              { text: "Motion Design", icon: "🎬" }
            ].map((item, index) => (
              <div
                key={index}
                className="detail-item flex items-center space-x-4 text-white/80 opacity-0"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xl font-light">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-16 text-center">
            <button className="group relative px-8 py-4 bg-transparent overflow-hidden">
              <span className="relative z-10 text-white text-lg font-medium">
                View My Work
              </span>
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:skew-x-12 transition-transform duration-500" />
              <div className="absolute inset-0 border border-white/20 transform hover:scale-105 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 text-white/30 transform -rotate-90">
        scroll down
      </div>
    </div>
  );
};

export default HeroSection;
