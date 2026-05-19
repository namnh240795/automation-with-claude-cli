import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DemoService } from './demo.service';
import { CreateDemoLogDto } from './dto';

@ApiTags('Demo')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post('log')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a demo log entry' })
  @ApiResponse({ status: 201, description: 'Log entry created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createLog(@Body() dto: CreateDemoLogDto) {
    return this.demoService.createDemoLog(dto);
  }
}