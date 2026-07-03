import { profile, responsibilities } from '@/lib/data';
import { MapPin, Github, Linkedin } from 'lucide-react';

export function AboutSection({ className = '' }: { className?: string }) {
  return (
    <section id="about" className={`card-interactive self-start p-5 pb-3 lg:p-6 lg:pb-4 ${className}`}>
      <h2 className="section-title mb-3">
        <span className="section-dot" />
        About
      </h2>
      <p className="body-text">{profile.summary}</p>
      <p className="gradient-text mt-3 text-base font-semibold">{profile.tagline}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-800 ring-1 ring-emerald-200/60">
          <MapPin size={16} className="text-emerald-600" />
          {profile.location}
        </span>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 ring-1 ring-blue-200/60 transition hover:bg-blue-100"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-sm text-violet-700 ring-1 ring-violet-200/60 transition hover:bg-violet-100"
        >
          <Github size={16} />
          GitHub
        </a>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Core Responsibilities
        </p>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {responsibilities.map((r) => (
            <li
              key={r}
              className="flex items-start gap-2 rounded-lg bg-gradient-to-r from-slate-50 to-emerald-50/50 px-2 py-1.5 text-sm leading-snug text-slate-700"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
