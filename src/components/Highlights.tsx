// jsx runtime import not required

interface HighlightsProps {
  id?: string;
}

const highlights = [
  {
    title: 'Performance & Accessibility',
    points: [
      'Reduced LCP by ~25% with code-splitting, lazy-loading, and image optimization',
      'Achieved 96+ Lighthouse Accessibility scores by adhering to WCAG',
    ],
  },
  {
    title: 'Product Impact',
    points: [
      'Improved payment success rate by ~15% via UX improvements and error handling',
      'Cut regressions by ~20% with unit and component tests (Jest/Vitest)',
    ],
  },
  {
    title: 'Tech Focus',
    points: [
      'React 18, Next.js 14, TypeScript, Tailwind, Redux Toolkit/Zustand',
      'CI/CD with Vercel and GitHub Actions; SEO & analytics instrumentation',
    ],
  },
];

export default function Highlights({ id }: HighlightsProps) {
  return (
    <section id={id} className="py-8 sm:py-12 md:py-16 lg:py-20 text-white relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
            Highlights
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            A quick snapshot of impact and fit for hiring teams
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((h) => (
            <div key={h.title} className="glass-effect rounded-xl p-5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">{h.title}</h3>
              <ul className="space-y-2 text-sm text-white/80">
                {h.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <div className="inline-flex gap-3">
            <a href="#projects" className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">View Projects</a>
            <a href="https://www.linkedin.com/in/charankumarreddypalukuru/" className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90" target="_blank" rel="noopener noreferrer">View Resume (LinkedIn)</a>
          </div>
        </div>
      </div>
    </section>
  );
}
