import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll progress + header background, batched to one update per frame
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`;
      setScrolled(window.scrollY > 20);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Highlight the section in view without measuring on every scroll
  useEffect(() => {
    const ids = ["home", ...navItems.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active === id ? "bg-white/[0.06] text-cyan-300" : "text-slate-300 hover:text-white"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || isOpen
          ? "border-b border-white/[0.06] bg-[#05070d]/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#home" onClick={() => setIsOpen(false)} aria-label="Back to top">
          <img
            src="/CharanLogo.png"
            alt="Palukuru Charan Kumar Reddy"
            className="h-7 w-auto sm:h-8"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={linkClass(item.id)}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-primary hidden !px-4 !py-2 !text-sm md:inline-flex">
          Hire me
        </a>

        <button
          className="rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`container-x overflow-hidden transition-[max-height] duration-300 md:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
        hidden={!isOpen}
      >
        <nav className="flex flex-col gap-1 pb-4" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`${linkClass(item.id)} py-3 text-base`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Scroll progress */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full origin-left bg-gradient-to-r from-cyan-400 to-violet-500"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </header>
  );
}

export default Header;
