import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILogin, IUser } from './interface';
import { PrismaService } from '../shared/database/prisma.service';
import { hashPassword, verifyHashedPassword } from '../shared/utils/bcrypt';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async create(data: IUser) {
    const isExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (isExists) {
      throw new ConflictException('Email already exists');
    }

    const password = await hashPassword(data.password);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password,
      },
      select: {
        email: true,
        firstname: true,
        lastname: true,
      },
    });

    await this.emailService.sendWelcomeEmail({
      to: user.email,
    });

    return user;
  }

  async login(data: ILogin) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPasswordValid = await verifyHashedPassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('incorrect credentials');
    }

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      access_token,
    };
  }
}
