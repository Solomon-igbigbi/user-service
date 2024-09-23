import { Processor, Process } from '@nestjs/bull';
import { IEmail } from '../interface';
import { Job } from 'bull';
import { EmailService } from '../email.service';

@Processor('emailSending')
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}
  @Process('welcome')
  async sendWelcomeEmail(job: Job<IEmail>) {
    const { data } = job;

    return await this.emailService.sendWelcomeEmail(data);
  }
}
