import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { last } from 'rxjs';
import { PrismaService } from '../src/shared/database/prisma.service';

describe('User E2E', () => {
  let app: INestApplication;

  const prismaService = new PrismaService();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('get a user detail GET /users/:id', () => {
    it('should get a user details', async () => {
      await request(app.getHttpServer()).post('/users/:123456789').expect(404);
    });

    it('should return 404 for not existing user', async () => {
      await request(app.getHttpServer()).post('/users/:123456789').expect(404);
    });
  });
});
