import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { PrismaService } from '../src/shared/database/prisma.service';

describe('Auth E2E', () => {
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

  describe('Creating new users POST /register', () => {
    it('should create a new user', async () => {
      await request(app.getHttpServer())
        .post('/register')
        .send({
          firstname: 'Solomon',
          lastname: 'Igbigbi',
          email: 'solomon.igbigbi@outlook.com',
          password: '123456789',
        })
        .expect(409);
    });

    it('should return bad request when invalid email', async () => {
      await request(app.getHttpServer())
        .post('/register')
        .send({
          firstname: 'Solomon',
          lastname: 'Igbigbi',
          email: 'solomon',
          password: '123456789',
        })
        .expect(400);
    });

    it('should return bad request when invalid firstname', async () => {
      await request(app.getHttpServer())
        .post('/register')
        .send({
          firstname: '',
          lastname: 'Igbigbi',
          email: 'solomon.igbigbi@outlook.com',
          password: '123456789',
        })
        .expect(400);
    });

    it('should return bad request when invalid lastname', async () => {
      await request(app.getHttpServer())
        .post('/register')
        .send({
          firstname: 'Solomon',
          lastname: '',
          email: 'solomon.igbigbi@outlook.com',
          password: '123456789',
        })
        .expect(400);
    });

    it('should return bad request when invalid password', async () => {
      await request(app.getHttpServer())
        .post('/register')
        .send({
          firstname: 'Solomon',
          lastname: 'Igbigbi',
          email: 'solomon.igbigbi@outlook.com',
          password: '1234',
        })
        .expect(400);
    });
  });

  // Login Users POST /login
  describe('Login Users POST /login', () => {
    it('should login a user', async () => {
      await request(app.getHttpServer())
        .post('/login')
        .send({
          email: 'solomon.igbigbi5@outlook.com',
          password: '1234536',
        })
        .expect(201);
    });

    it('should return bad request error when login with an invalid email', async () => {
      await request(app.getHttpServer())
        .post('/login')
        .send({
          email: 'solomon.igbigbi5.com',
          password: '1234536',
        })
        .expect(400);
    });

    it('should return bad request error when login with an invalid password', async () => {
      await request(app.getHttpServer())
        .post('/login')
        .send({
          email: 'solomon.igbigbi5.com',
          password: '12345',
        })
        .expect(400);
    });
  });
});
