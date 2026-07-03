import { Sidebar, MobileNav } from '@/components/Sidebar';
import { StatsBar } from '@/components/StatsBar';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { EducationSection } from '@/components/EducationSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';

export default function App() {
  return (
    <div className="mesh-bg min-h-screen">
      <MobileNav />

      <div className="lg:flex">
        <Sidebar />

        <main className="flex-1 lg:h-screen lg:overflow-y-auto">
          <div className="mx-auto max-w-6xl space-y-4 p-4 lg:p-5">
            <div className="animate-section" style={{ animationDelay: '0ms' }}>
              <StatsBar />
            </div>

            <div
              className="grid animate-section items-start gap-4 xl:grid-cols-2"
              style={{ animationDelay: '100ms' }}
            >
              <AboutSection className="order-1 xl:col-start-1 xl:row-start-1" />
              <ExperienceSection className="order-2 xl:col-start-2 xl:row-start-1" />
              <SkillsSection className="order-3 xl:col-start-1 xl:row-start-2" />
              <EducationSection className="order-4 xl:col-start-2 xl:row-start-2" />
            </div>

            <div className="animate-section" style={{ animationDelay: '300ms' }}>
              <ProjectsSection />
            </div>

            <div className="animate-section" style={{ animationDelay: '400ms' }}>
              <ContactSection />
            </div>

            <footer className="pb-4 pt-2 text-center text-sm text-slate-500">
              © {new Date().getFullYear()} Ghulam Muhammad · Built with React & NestJS
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
