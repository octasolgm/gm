import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private connected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.connected = true;
    } catch {
      console.warn('Database unavailable — contact form storage disabled until MySQL is configured.');
    }
  }

  get isConnected() {
    return this.connected;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
