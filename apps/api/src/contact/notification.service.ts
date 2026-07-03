import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly config: ConfigService) {}

  private createTransporter() {
    const host = this.config.get<string>('SMTP_HOST');
    const port = Number(this.config.get<string>('SMTP_PORT') ?? 587);
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    if (!host || !user || !pass) return null;

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  async sendContactNotification(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    const ownerEmail = this.config.get<string>('OWNER_EMAIL') ?? 'soomrogm@gmail.com';
    const transporter = this.createTransporter();

    if (!transporter) {
      this.logger.warn('SMTP not configured — skipping email notification');
      return;
    }

    const html = `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone ?? 'N/A'}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr/>
      <p>${data.message.replace(/\n/g, '<br/>')}</p>
    `;

    await transporter.sendMail({
      from: this.config.get<string>('SMTP_FROM') ?? ownerEmail,
      to: ownerEmail,
      subject: `[Portfolio] ${data.subject}`,
      html,
      replyTo: data.email,
    });
  }

  async sendAutoReply(to: string, name: string) {
    const transporter = this.createTransporter();
    if (!transporter) return;

    await transporter.sendMail({
      from: this.config.get<string>('SMTP_FROM') ?? this.config.get<string>('OWNER_EMAIL'),
      to,
      subject: 'Thanks for reaching out — Ghulam Muhammad',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you within 24–48 hours.</p>
        <p>Best regards,<br/><strong>Ghulam Muhammad</strong><br/>Senior Full Stack Developer</p>
      `,
    });
  }

  async sendWhatsAppAlert(data: { name: string; subject: string; email: string }) {
    const phone = this.config.get<string>('WHATSAPP_PHONE');
    const apiKey = this.config.get<string>('CALLMEBOT_API_KEY');

    if (!phone || !apiKey) {
      this.logger.warn('WhatsApp (CallMeBot) not configured — skipping');
      return;
    }

    const text = encodeURIComponent(
      `📩 New portfolio message\nFrom: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}`,
    );

    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) this.logger.warn(`WhatsApp alert failed: ${res.status}`);
    } catch (err) {
      this.logger.error('WhatsApp alert error', err);
    }
  }
}
