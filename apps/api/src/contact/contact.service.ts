import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from './notification.service';
import { CreateContactDto, TrackEventDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationService,
  ) {}

  async createContact(dto: CreateContactDto) {
    let savedId = 0;

    if (this.prisma.isConnected) {
      try {
        const saved = await this.prisma.contactMessage.create({
          data: {
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            subject: dto.subject,
            message: dto.message,
          },
        });
        savedId = saved.id;
      } catch (err) {
        this.logger.warn('Could not save contact message to database', err);
      }
    }

    await Promise.allSettled([
      this.notifications.sendContactNotification(dto),
      this.notifications.sendAutoReply(dto.email, dto.name),
      this.notifications.sendWhatsAppAlert({
        name: dto.name,
        subject: dto.subject,
        email: dto.email,
      }),
    ]);

    if (savedId > 0) {
      return { success: true, id: savedId, message: 'Message sent successfully' };
    }

    return {
      success: true,
      id: 0,
      message: 'Message sent (notifications only — database not connected)',
    };
  }

  async trackEvent(dto: TrackEventDto, ip?: string, userAgent?: string) {
    if (!this.prisma.isConnected) {
      return { success: true, tracked: false };
    }

    try {
      await this.prisma.contactEvent.create({
        data: {
          type: dto.type,
          metadata: dto.metadata,
          ip,
          userAgent,
        },
      });
      return { success: true, tracked: true };
    } catch (err) {
      this.logger.warn('Could not track contact event', err);
      return { success: true, tracked: false };
    }
  }

  async getMessages(adminKey?: string) {
    const key = process.env.ADMIN_KEY;
    if (!key || adminKey !== key) {
      return { error: 'Unauthorized' };
    }

    if (!this.prisma.isConnected) {
      return { error: 'Database not connected', messages: [] };
    }

    try {
      const messages = await this.prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      return { messages };
    } catch (err) {
      this.logger.warn('Could not fetch contact messages', err);
      return { error: 'Database unavailable', messages: [] };
    }
  }
}
