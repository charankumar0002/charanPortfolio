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
    <section id={id} ref={formRef} className="bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">Get in Touch</h2>
        <p className="text-gray-300 mb-8">Have a question or want to work together? Feel free to drop a message.</p>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
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
              className="w-full p-3 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
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
              className="w-full p-3 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;