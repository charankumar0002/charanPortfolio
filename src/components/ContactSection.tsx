import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  id: string;
}

function ContactSection({ id }: ContactProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const form = formRef.current;

    if (form) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          form,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: form,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id={id} ref={formRef} className="py-8 sm:py-12 md:py-16 lg:py-20 text-white relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-28 h-28 sm:w-40 sm:h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Enhanced title with decorative elements */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-wide">
              Get in Touch
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            Ready to collaborate on your next project? Let's create something amazing together
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-700/50 hover:border-purple-500/50 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-lg sm:hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg sm:rounded-xl md:rounded-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-white group-hover:text-purple-300 transition-colors duration-300">Contact Information</h3>
              
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className="flex items-start space-x-3 sm:space-x-4 group">
                  <div className="text-cyan-400 text-xl sm:text-2xl md:text-3xl mt-1 flex-shrink-0">📍</div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg md:text-xl text-white group-hover:text-purple-300 transition-colors duration-300">Location</h4>
                    <p className="text-gray-300 text-sm sm:text-base mt-1">Bengaluru, Karnataka, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4 group">
                  <div className="text-cyan-400 text-xl sm:text-2xl md:text-3xl mt-1 flex-shrink-0">📱</div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg md:text-xl text-white group-hover:text-purple-300 transition-colors duration-300">Phone</h4>
                    <a href="tel:+917893346088" className="text-cyan-400 hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base mt-1">+91 7893346088</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4 group">
                  <div className="text-cyan-400 text-xl sm:text-2xl md:text-3xl mt-1 flex-shrink-0">📧</div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg md:text-xl text-white group-hover:text-purple-300 transition-colors duration-300">Email</h4>
                    <a href="mailto:charanpalukuru002@gmail.com" className="text-cyan-400 hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base mt-1 break-all">charanpalukuru002@gmail.com</a>
                  </div>
                </div>
                
                <div className="pt-3 sm:pt-4">
                  <h4 className="font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-white">Social Profiles</h4>
                  <div className="flex space-x-3 sm:space-x-4">
                    <a href="https://www.linkedin.com/in/charankumarreddypalukuru/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/25 mobile-tap-highlight">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                      </svg>
                    </a>
                    <a href="https://github.com/charankumar0002" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-gray-500/25 mobile-tap-highlight">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-700/50 hover:border-purple-500/50 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-lg sm:hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg sm:rounded-xl md:rounded-2xl"></div>
            
            {/* Form Content */}
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-white group-hover:text-purple-300 transition-colors duration-300">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base mobile-button"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base mobile-button"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base mobile-button"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base mobile-button mobile-tap-highlight"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
