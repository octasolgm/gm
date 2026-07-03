import { useState } from 'react';
import { experiences } from '@/lib/data';
import { Modal } from './Modal';
import { ExternalLink } from 'lucide-react';

const ACCENT = [
  'from-emerald-500 to-teal-400',
  'from-blue-500 to-cyan-400',
  'from-violet-500 to-purple-400',
  'from-amber-500 to-orange-400',
];

type Experience = (typeof experiences)[0];

export function ExperienceSection({ className = '' }: { className?: string }) {
  const [selected, setSelected] = useState<Experience | null>(null);

  return (
    <section id="experience" className={`card-interactive p-5 lg:p-6 ${className}`}>
      <h2 className="section-title">
        <span className="section-dot" />
        Experience
      </h2>
      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <button
            key={exp.id}
            type="button"
            onClick={() => setSelected(exp)}
            className={`clickable-card group relative w-full rounded-lg bg-gradient-to-r from-slate-50/80 to-transparent p-3 pl-5 text-left hover:from-emerald-50/60 ${
              i < experiences.length - 1 ? 'border-l-2 border-dashed border-emerald-200' : ''
            }`}
            title={`View ${exp.role} at ${exp.company}`}
          >
            <span
              className={`absolute -left-[7px] top-4 h-3 w-3 rounded-full bg-gradient-to-br ${ACCENT[i % ACCENT.length]} shadow-md`}
            />
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700">
                  {exp.role}
                </h3>
                <p
                  className={`bg-gradient-to-r ${ACCENT[i % ACCENT.length]} bg-clip-text text-sm font-semibold text-transparent`}
                >
                  {'url' in exp && exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      {exp.company}
                      <ExternalLink size={12} className="opacity-70" />
                    </a>
                  ) : (
                    exp.company
                  )}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">
                {exp.period}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {exp.location} · {exp.type}
            </p>
            <ul className="mt-2 space-y-1">
              {exp.highlights.slice(0, 2).map((h) => (
                <li key={h} className="text-sm leading-relaxed text-slate-700">
                  • {h}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {exp.tech.slice(0, 5).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-2 block text-[11px] font-medium text-emerald-600 opacity-0 transition group-hover:opacity-100">
              Click for full details →
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <ExperienceDetailModal
          exp={selected}
          accent={ACCENT[experiences.indexOf(selected) % ACCENT.length]}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

function ExperienceDetailModal({
  exp,
  accent,
  onClose,
}: {
  exp: Experience;
  accent: string;
  onClose: () => void;
}) {
  return (
    <Modal
      open
      onClose={onClose}
      title={exp.role}
      subtitle={`${exp.company} · ${exp.period}`}
      wide
    >
      <div className="flex flex-wrap gap-2 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5">{exp.location}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5">{exp.type}</span>
        {'url' in exp && exp.url && (
          <a
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
          >
            {exp.company}
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Key Achievements
        </p>
        <ul className="space-y-2">
          {exp.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${accent}`}
              />
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Technologies Used
        </p>
        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Modal>
  );
}
