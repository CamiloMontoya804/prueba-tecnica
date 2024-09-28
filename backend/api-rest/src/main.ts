import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from './app.module';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';


async function bootstrap() {
  const logger = new Logger('API REST - Main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter);

  const config = new DocumentBuilder()
    .setTitle("API Rest - Prueba tecnica")
    .setDescription("NestJs (microservices) + NextJS")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(envs.port);

  logger.log(`API REST running in port: ${envs.port}`);
}
bootstrap();
