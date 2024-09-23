import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './shared/config/env.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());

  await app.listen(config.PORT.APP_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
