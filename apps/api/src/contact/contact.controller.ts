import { Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ContactService } from './contact.service';
import { CreateContactDto, TrackEventDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactService.createContact(dto);
  }

  @Post('track')
  track(@Body() dto: TrackEventDto, @Req() req: Request) {
    const ip = req.headers['x-forwarded-for']?.toString() ?? req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.contactService.trackEvent(dto, ip, userAgent);
  }

  @Get('messages')
  getMessages(@Headers('x-admin-key') adminKey: string) {
    return this.contactService.getMessages(adminKey);
  }
}
