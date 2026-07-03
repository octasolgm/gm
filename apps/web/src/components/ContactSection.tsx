import { useState } from 'react';
import { profile } from '@/lib/data';
import { submitContact, trackEvent } from '@/lib/api';
import { Send, Phone, Mail, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';

const inputClass =
  'rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/25';

const LINK_BTNS = [
  { icon: Mail, label: 'Email', href: `mailto:${profile.email}`, track: 'email_click', className: 'from-blue-50 to-cyan-50 text-blue-700 ring-blue-200 hover:from-blue-100 hover:to-cyan-100' },
  { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${profile.phoneLink}`, track: 'whatsapp_click', className: 'from-emerald-50 to-green-50 text-emerald-700 ring-emerald-200 hover:from-emerald-100 hover:to-green-100', external: true },
  { icon: Phone, label: 'Call', href: `tel:${profile.phone}`, track: 'call_click', className: 'from-violet-50 to-purple-50 text-violet-700 ring-violet-200 hover:from-violet-100 hover:to-purple-100' },
  { icon: Send, label: 'LinkedIn', href: profile.linkedin, track: 'linkedin_click', className: 'from-sky-50 to-blue-50 text-sky-700 ring-sky-200 hover:from-sky-100 hover:to-blue-100', external: true },
];

export function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleTrack = (type: string) => trackEvent(type);

  const linkBtn =
    'flex items-center gap-2 rounded-xl bg-gradient-to-br p-3 text-sm font-semibold ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md';

  return (
    <section id="contact" className="card-interactive relative overflow-hidden p-5 lg:p-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5" />
      <h2 className="section-title relative">
        <span className="section-dot" />
        Contact
      </h2>

      <div className="relative grid gap-6 lg:grid-cols-2">
        <div>
          <p className="body-text">
            Interested in hiring or collaborating? Send a message — I&apos;ll respond within
            24–48 hours.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {LINK_BTNS.map(({ icon: Icon, label, href, track, className, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                onClick={() => handleTrack(track)}
                className={`${linkBtn} ${className}`}
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`w-full ${inputClass}`}
          />
          <input
            required
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={`w-full ${inputClass}`}
          />
          <textarea
            required
            rows={4}
            placeholder="Your message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`w-full resize-none ${inputClass}`}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-60"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 size={18} /> Message Sent!
              </>
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </button>
          {status === 'error' && (
            <p className="text-center text-sm text-red-600">{errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
}
