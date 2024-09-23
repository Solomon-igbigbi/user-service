import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import * as nodemailer from 'nodemailer';
import { IEmail } from './interface';

@Injectable()
export class EmailService {
  transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: '924402c225a4bf',
      pass: '7e804b6a8d8584',
    },
  });

  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async sendWelcomeEmail(data: IEmail) {
    console.log(data);
    const job = await this.emailQueue.add('welcome', { ...data });

    console.log(job);

    return { jobId: job.id };
  }

  async sendEmail(to: string, subject: string, text: string) {
    return await this.transporter.sendMail({
      from: 'Solomon Igbigbi <solomon.igbigbi@outlook.com>',
      to: to,
      subject: subject,
      text: text,
      html: '<b>Welcome To The App</b>',
    });
  }
}
