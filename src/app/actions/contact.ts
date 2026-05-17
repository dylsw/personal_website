'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData): Promise<{ ok: boolean }> {
  const name    = (formData.get('name')    as string | null)?.trim() || '';
  const email   = (formData.get('email')   as string | null)?.trim() || '';
  const message = (formData.get('message') as string | null)?.trim() || '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false };
  }

  await resend.emails.send({
    from:     'Portfolio <onboarding@resend.dev>',
    to:       'dylan.wo@gmail.com',
    replyTo: email,
    subject:  `New message from ${name || email}`,
    text:     `Name: ${name || '—'}\nEmail: ${email}\n\n${message || '(no message)'}`,
  });

  return { ok: true };
}
