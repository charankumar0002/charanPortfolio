import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  id: string;
}

function FooterSection({ id }: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (footer) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          footer,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 90%",
              end: "top 60%",
              toggleActions: "play none none reverse",
              markers: false,
              scrub: false,
            },
          }
        );
      });

      return () => {
        ctx.revert();
      };
    }
  }, []);

  return (
    <footer
      id={id}
      ref={footerRef}
      className="bg-black text-white py-10 mt-20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} Charan. All rights reserved.</p>
        <div className="mt-6 flex justify-center space-x-8 text-xl">
          <a href="#" className="text-purple-400 hover:text-purple-600 transition-transform transform hover:scale-110">LinkedIn</a>
          <a href="#" className="text-purple-400 hover:text-purple-600 transition-transform transform hover:scale-110">GitHub</a>
          <a href="#" className="text-purple-400 hover:text-purple-600 transition-transform transform hover:scale-110">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;