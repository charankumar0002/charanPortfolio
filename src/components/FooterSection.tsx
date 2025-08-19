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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:text-left text-center">
            <h3 className="text-xl font-semibold mb-4">Palukuru Charan Kumar Reddy</h3>
            <p className="text-gray-300">Software Developer</p>
            <p className="text-gray-400 mt-2">Bengaluru, Karnataka, India</p>
          </div>
          
          <div className="text-center">
            
            <p className="mt-4 text-gray-300">charanpalukuru002@gmail.com</p>
            <p className="text-gray-300">+91 97030 90201</p>
          </div>
          
          <div className="md:text-right text-center">
            <div className="flex justify-center md:justify-end space-x-6 text-xl">
              <a href="https://www.linkedin.com/in/charankumarreddypalukuru/" className="text-purple-400 hover:text-purple-600 transition-transform transform hover:scale-110">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              <a href="https://github.com/charankumar0002" className="text-purple-400 hover:text-purple-600 transition-transform transform hover:scale-110">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://x.com/CharanK29063387" className="text-purple-400 hover:text-purple-600 transition-transform transform hover:scale-110">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <p className="mt-6 text-gray-400">&copy; {new Date().getFullYear()} Charan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;