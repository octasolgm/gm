import { useEffect, useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderKanban,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { ProfileAvatar, PROFILE_IMAGE } from './ProfileAvatar';
import { profile } from '@/lib/data';
import { Modal } from './Modal';
import { scrollToSection } from '@/lib/scroll';

const NAV = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Sidebar() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s!));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:flex lg:w-[260px] lg:shrink-0 lg:flex-col lg:border-r lg:border-emerald-100/80 lg:bg-gradient-to-b lg:from-white lg:via-emerald-50/40 lg:to-violet-50/30">
      <div className="sticky top-0 flex h-dvh max-h-dvh flex-col overflow-hidden px-4 py-4">
        <div className="shrink-0">
          <ProfileHeader compact />
        </div>

        <nav className="mt-3 min-h-0 flex-1 space-y-0.5 overflow-hidden py-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className={`sidebar-nav-link ${active === id ? 'nav-link-active' : ''}`}
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </nav>

        <div className="shrink-0 pt-2">
          <QuickContact />
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <ProfileHeader mini />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white pt-16 lg:hidden">
          <nav className="flex flex-col gap-0.5 p-4">
            {NAV.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                  setOpen(false);
                }}
                className="nav-link"
              >
                <Icon size={20} />
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto border-t border-slate-200 p-4">
            <QuickContact />
          </div>
        </div>
      )}
    </>
  );
}

function ProfileHeader({ mini }: { compact?: boolean; mini?: boolean }) {
  const [photoOpen, setPhotoOpen] = useState(false);

  if (mini) {
    return (
      <>
        <div className="flex items-center gap-3">
          <ProfileAvatar
            size="sm"
            className="rounded-xl ring-offset-white"
            onClick={() => setPhotoOpen(true)}
          />
          <div>
            <p className="text-base font-semibold text-slate-900">Ghulam Muhammad</p>
            <p className="text-sm text-slate-500">Full Stack Developer</p>
          </div>
        </div>
        <PhotoLightbox open={photoOpen} onClose={() => setPhotoOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div className="text-center">
        <ProfileAvatar size="md" className="mx-auto rounded-xl" onClick={() => setPhotoOpen(true)} />
        <h1 className="mt-2 text-lg font-bold leading-tight text-slate-900">Ghulam Muhammad</h1>
        <p className="gradient-text mt-0.5 text-sm font-semibold">Senior Full Stack Developer</p>
        <p className="mt-0.5 text-xs text-slate-500">{profile.location}</p>
        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className="mt-2 inline-block rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm shadow-emerald-500/30 transition hover:scale-105"
        >
          Open to work
        </button>
      </div>
      <PhotoLightbox open={photoOpen} onClose={() => setPhotoOpen(false)} />
    </>
  );
}

function PhotoLightbox({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title={profile.name} subtitle={profile.title}>
      <div className="overflow-hidden rounded-xl ring-2 ring-emerald-200">
        <img
          src={PROFILE_IMAGE}
          alt={profile.name}
          width={400}
          height={400}
          className="h-auto w-full object-cover"
        />
      </div>
      <p className="mt-3 text-sm text-slate-600">{profile.summary}</p>
    </Modal>
  );
}

function QuickContact() {
  return (
    <div className="space-y-2 border-t border-slate-200 pt-3">
      <a
        href="mailto:soomrogm@gmail.com"
        className="flex items-center gap-2 truncate text-xs text-slate-600 hover:text-brand-700"
        title={profile.email}
      >
        <Mail size={14} className="shrink-0" />
        <span className="truncate">{profile.email}</span>
      </a>
      <a
        href="https://wa.me/923313543210"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp flex w-full items-center justify-center gap-2"
      >
        WhatsApp Me
      </a>
    </div>
  );
}

export { NAV };
