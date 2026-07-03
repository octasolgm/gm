export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.classList.add('section-flash');
  window.setTimeout(() => el.classList.remove('section-flash'), 1200);
}
