import { LogActivity } from '@app/app-logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check(): { message: string } {
    return {
      message: 'Ok',
    };
  }
}
