const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? 'Failed to send message');
  }

  return res.json();
}

export async function trackEvent(type: string, metadata?: string) {
  try {
    await fetch(`${API_URL}/contact/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, metadata }),
    });
  } catch {
    /* non-blocking */
  }
}
