import { useState } from "react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import { contactInfo, socialLinks } from "../common/socialLinks";
import { saveMessage, supabase } from "../lib/supabase";

interface ContactProps {
  id: string;
}

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-slate-500 transition-colors focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

function ContactPage({ id }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  // Hidden field only bots fill in.
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fallback: hand the message to the visitor's email app, prefilled.
  const openMailApp = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setStatus("sent");
      return;
    }
    if (!supabase) {
      openMailApp();
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      await saveMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setFormData({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const details = [
    { label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { label: "Phone", value: contactInfo.phoneDisplay, href: contactInfo.phoneHref },
    { label: "Location", value: contactInfo.location },
  ];

  return (
    <section id={id} className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          subtitle="Open to full-stack roles and interesting projects. The fastest way to reach me is email."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="card p-6 sm:p-8 lg:col-span-2">
            <dl className="space-y-6">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{d.label}</dt>
                  <dd className="mt-1 break-all text-slate-200">
                    {d.href ? (
                      <a href={d.href} className="transition-colors hover:text-cyan-300">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-xl border border-white/10 p-3 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="card p-6 sm:p-8 lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputClass}
                    required
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Your email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    autoComplete="email"
                    className={inputClass}
                    required
                  />
                </label>
              </div>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the role or project"
                  rows={6}
                  className={`${inputClass} resize-none`}
                  required
                />
              </label>
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <button
                type="submit"
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              <div role="status" aria-live="polite" className="text-center text-sm">
                {status === "sent" && (
                  <p className="text-emerald-300">Thanks! Your message was sent. I'll get back to you soon.</p>
                )}
                {status === "error" && (
                  <p className="text-rose-300">
                    Something went wrong sending your message.{" "}
                    <button type="button" onClick={openMailApp} className="text-cyan-300 underline">
                      Send it by email instead
                    </button>
                    .
                  </p>
                )}
                {status === "mailto" && (
                  <p className="text-slate-400">
                    Your email app should open with the message ready to send. If it didn't, email me at{" "}
                    <a href={`mailto:${contactInfo.email}`} className="text-cyan-300 underline">
                      {contactInfo.email}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
