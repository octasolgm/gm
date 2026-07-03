import { useState } from 'react';
import { education } from '@/lib/data';
import { Modal } from './Modal';

type Edu = (typeof education)[0];

export function EducationSection({ className = '' }: { className?: string }) {
  const [selected, setSelected] = useState<Edu | null>(null);

  return (
    <section id="education" className={`card-interactive p-5 lg:p-6 ${className}`}>
      <h2 className="section-title">
        <span className="section-dot" />
        Education
      </h2>
      <div className="space-y-3">
        {education.map((edu, i) => (
          <button
            key={edu.degree}
            type="button"
            onClick={() => setSelected(edu)}
            className={`clickable-card group w-full text-left ${
              i === 0
                ? 'rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-cyan-50/50 to-violet-50/30 p-4 shadow-sm shadow-emerald-500/5 hover:shadow-md'
                : 'rounded-lg p-2 hover:bg-slate-50'
            }`}
            title={`View ${edu.degree}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700">
                  {edu.degree}
                </h3>
                <p className="text-sm text-slate-600">{edu.institution}</p>
              </div>
              <div className="text-right">
                <p className="rounded-full bg-white/80 px-2 py-0.5 font-mono text-xs text-slate-600 ring-1 ring-slate-200">
                  {edu.period}
                </p>
                {edu.grade && (
                  <p className="gradient-text mt-1 text-sm font-bold">{edu.grade}</p>
                )}
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {edu.field} · {edu.location}
            </p>
            <span className="mt-2 block text-[11px] font-medium text-emerald-600 opacity-0 transition group-hover:opacity-100">
              Click for details →
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <EducationDetailModal edu={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function EducationDetailModal({ edu, onClose }: { edu: Edu; onClose: () => void }) {
  return (
    <Modal open onClose={onClose} title={edu.degree} subtitle={edu.institution}>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Field</dt>
          <dd className="mt-0.5 text-slate-800">{edu.field}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Period</dt>
          <dd className="mt-0.5 font-mono text-slate-800">{edu.period}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</dt>
          <dd className="mt-0.5 text-slate-800">{edu.location}</dd>
        </div>
        {edu.grade && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Grade</dt>
            <dd className="gradient-text mt-0.5 text-lg font-bold">{edu.grade}</dd>
          </div>
        )}
      </dl>
    </Modal>
  );
}
