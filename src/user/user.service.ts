import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserDetails(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
