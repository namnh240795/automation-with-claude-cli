import { Injectable, Logger } from '@nestjs/common';
import { LogActivity } from '@app/app-logger';
import { CreateDemoLogDto } from './dto';

@Injectable()
export class DemoService {
  private readonly logger = new Logger(DemoService.name);

  @LogActivity()
  async createDemoLog(_data: CreateDemoLogDto): Promise<{ success: boolean; eventId: string }> {
    const eventId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    this.logger.log(`Creating demo log: ${eventId}`);

    return {
      success: true,
      eventId,
    };
  }
}