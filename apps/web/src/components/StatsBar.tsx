import { experiences, projects, skillCategories } from '@/lib/data';
import { scrollToSection } from '@/lib/scroll';

const stats = [
  {
    label: 'Years Experience',
    value: '5+',
    section: 'experience',
    gradient: 'from-emerald-500 to-teal-400',
    bar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    glow: 'shadow-emerald-500/20',
  },
  {
    label: 'Companies',
    value: String(experiences.length),
    section: 'experience',
    gradient: 'from-blue-500 to-cyan-400',
    bar: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    glow: 'shadow-blue-500/20',
  },
  {
    label: 'Projects',
    value: String(projects.length),
    section: 'projects',
    gradient: 'from-violet-500 to-purple-400',
    bar: 'bg-gradient-to-r from-violet-500 to-purple-400',
    glow: 'shadow-violet-500/20',
  },
  {
    label: 'Tech Stack',
    value: String(skillCategories.reduce((a, c) => a + c.skills.length, 0)),
    section: 'skills',
    gradient: 'from-amber-500 to-orange-400',
    bar: 'bg-gradient-to-r from-amber-500 to-orange-400',
    glow: 'shadow-amber-500/20',
  },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s, i) => (
        <button
          key={s.label}
          type="button"
          onClick={() => scrollToSection(s.section)}
          className={`clickable-tile group stat-card flex flex-col items-center justify-center px-4 py-4 ${s.glow} hover:shadow-lg`}
          style={{ animationDelay: `${i * 80}ms` }}
          title={`Go to ${s.label}`}
        >
          <div className={`absolute inset-x-0 top-0 h-1 ${s.bar}`} />
          <span
            className={`bg-gradient-to-br ${s.gradient} bg-clip-text font-mono text-3xl font-bold text-transparent`}
          >
            {s.value}
          </span>
          <span className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-500">
            {s.label}
          </span>
          <span className="mt-1 text-[11px] font-medium text-emerald-600 opacity-70 group-hover:opacity-100">
            View →
          </span>
        </button>
      ))}
    </div>
  );
}
