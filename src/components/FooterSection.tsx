import { useEffect, useState } from "react";
import { socialLinks } from "../common/socialLinks";
import { getViewCount } from "../lib/supabase";

interface FooterProps {
  id: string;
}

function FooterSection({ id }: FooterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    getViewCount().then((n) => {
      if (active) setViews(n);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <footer id={id} className="border-t border-white/[0.06] py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-semibold text-white">Palukuru Charan Kumar Reddy</p>
          <p className="mt-1 text-sm text-slate-400">Full Stack Developer · Bengaluru, India</p>
        </div>

        <div className="flex gap-2">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:text-cyan-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d={s.icon} />
              </svg>
            </a>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Palukuru Charan Kumar Reddy</p>
          {views !== null && (
            <p className="mt-1">
              <span className="text-cyan-400">{views.toLocaleString()}</span> visits
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
