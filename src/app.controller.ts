import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { Response } from 'express';
import { Public } from './shared/middleware/auth/auth.middleware';

@Controller()
export class AppController extends PrometheusController {
  @Public()
  @Get('/metrics')
  async index(@Res({ passthrough: true }) response: Response) {
    return super.index(response);
  }
}
