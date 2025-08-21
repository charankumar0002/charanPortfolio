import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  id: string;
}

function ContactPage({ id }: ContactProps) {
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
    <section id={id} ref={formRef} className="py-20 px-4 relative overflow-hidden">
      {/* Subtle dark background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-800/15" />
      
      {/* Very subtle blue accent orbs */}
      <div className="absolute top-16 left-16 w-40 h-40 bg-gradient-to-r from-blue-600/4 to-blue-500/2 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-16 right-16 w-48 h-48 bg-gradient-to-r from-blue-500/4 to-blue-600/2 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold text-primary mb-6 text-center">Get in Touch</h2>
        <p className="text-white/80 mb-12 text-center text-lg glass-effect rounded-lg p-4 mx-auto max-w-2xl">Looking for a Software Developer who can express potential and deliver results through challenging assignments? Let's connect!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-effect p-8 rounded-lg subtle-border">
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="text-primary text-2xl mt-1">📍</div>
                <div>
                  <h4 className="font-semibold text-lg text-white group-hover:text-primary transition-colors duration-200">Location</h4>
                  <p className="text-white/70">Bengaluru, Karnataka, India</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="text-primary text-2xl mt-1">📱</div>
                <div>
                  <h4 className="font-semibold text-lg text-white group-hover:text-primary transition-colors duration-200">Phone</h4>
                                    <p className="text-white/70">+91 7893346088</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="text-primary text-2xl mt-1">📧</div>
                <div>
                  <h4 className="font-semibold text-lg text-white group-hover:text-primary transition-colors duration-200">Email</h4>
                  <a href="mailto:charanpalukuru002@gmail.com" className="text-primary hover:text-primary-light transition-colors duration-200">charanpalukuru002@gmail.com</a>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-semibold text-lg mb-3 text-white">Social Profiles</h4>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/charankumarreddypalukuru/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-blue-glow">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </a>
                  <a href="https://github.com/charankumar0002" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-blue-glow">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-lg subtle-border card-hover-lift card-pattern-dots hover:shadow-blue-glow">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;