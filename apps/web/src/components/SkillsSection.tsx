import { skillCategories } from '@/lib/data';

const CATEGORY_STYLES = [
  { label: 'text-emerald-700', bar: 'from-emerald-500 to-teal-400', bg: 'from-emerald-50 to-teal-50' },
  { label: 'text-blue-700', bar: 'from-blue-500 to-cyan-400', bg: 'from-blue-50 to-cyan-50' },
  { label: 'text-violet-700', bar: 'from-violet-500 to-purple-400', bg: 'from-violet-50 to-purple-50' },
  { label: 'text-amber-700', bar: 'from-amber-500 to-orange-400', bg: 'from-amber-50 to-orange-50' },
];

export function SkillsSection({ className = '' }: { className?: string }) {
  return (
    <section id="skills" className={`card-interactive p-5 lg:p-6 ${className}`}>
      <h2 className="section-title">
        <span className="section-dot" />
        Skills
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((cat, ci) => {
          const style = CATEGORY_STYLES[ci % CATEGORY_STYLES.length];
          return (
            <div
              key={cat.category}
              className={`rounded-xl bg-gradient-to-br ${style.bg} p-3 ring-1 ring-white/80`}
            >
              <p className={`mb-2 text-sm font-bold uppercase tracking-wide ${style.label}`}>
                {cat.category}
              </p>
              <div className="space-y-2.5">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-slate-800">{skill.name}</span>
                      <span className="font-mono font-semibold text-slate-600">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/70 shadow-inner">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${style.bar} transition-all duration-700`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
