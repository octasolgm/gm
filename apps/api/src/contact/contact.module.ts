import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { NotificationService } from './notification.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, NotificationService],
})
export class ContactModule {}
