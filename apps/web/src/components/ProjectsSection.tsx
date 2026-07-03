import { useMemo, useState } from 'react';
import { projects } from '@/lib/data';
import { Star, ExternalLink } from 'lucide-react';
import { Modal } from './Modal';

const FILTERS = ['All', 'Personal', 'Professional', 'Early Career'] as const;
type Filter = (typeof FILTERS)[number];
type Project = (typeof projects)[0];

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="card-interactive p-5 lg:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="section-title mb-0">
          <span className="section-dot" />
          Projects
          <span className="ml-1 normal-case text-slate-500">({projects.length})</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md shadow-emerald-500/30'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-emerald-300 hover:text-emerald-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500">No projects in this category.</p>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} onSelect={setSelected} />
              ))}
            </div>
          )}

          {others.length > 0 && (
            <>
              {featured.length > 0 && (
                <p className="mb-3 mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  More in {filter === 'All' ? 'All Categories' : filter}
                </p>
              )}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((project) => (
                  <ProjectCard key={project.id} project={project} compact onSelect={setSelected} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {selected && (
        <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  compact,
  onSelect,
}: {
  project: Project;
  compact?: boolean;
  onSelect: (p: Project) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="clickable-card group relative w-full overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-4 text-left hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10"
      title={`View ${project.title}`}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            {project.featured && !compact && (
              <Star size={14} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
            )}
            <h3 className="text-base font-semibold text-slate-900 transition group-hover:text-emerald-700">
              {project.title}
            </h3>
          </div>
          <span className="mt-1 inline-block text-sm text-slate-500">{project.category}</span>
        </div>
        {project.github && (
          <span
            role="link"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.github, '_blank', 'noopener,noreferrer');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                e.preventDefault();
                window.open(project.github!, '_blank', 'noopener,noreferrer');
              }
            }}
            className="shrink-0 rounded p-0.5 text-slate-400 hover:text-brand-700"
            title="View on GitHub"
          >
            <ExternalLink size={16} />
          </span>
        )}
      </div>
      <p
        className={`mt-2 text-sm leading-relaxed text-slate-700 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}
      >
        {project.description}
      </p>
      {!compact && project.highlights && project.highlights.length > 0 && (
        <ul className="mt-2 space-y-0.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="text-xs text-slate-600">
              · {h}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.slice(0, compact ? 4 : 6).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <span className="mt-2 block text-[11px] font-medium text-emerald-600 opacity-0 transition group-hover:opacity-100">
        Click for details →
      </span>
    </button>
  );
}

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Modal
      open
      onClose={onClose}
      title={project.title}
      subtitle={project.category}
      wide
    >
      <p className="text-sm leading-relaxed text-slate-700">{project.description}</p>

      {project.highlights && project.highlights.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Highlights
          </p>
          <ul className="space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition hover:scale-[1.02]"
        >
          <ExternalLink size={16} />
          View on GitHub
        </a>
      )}
    </Modal>
  );
}
