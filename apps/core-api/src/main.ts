import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env);
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  // app.register(fastifyHelmet, {});

  // app.useLogger(app.resolve(LoggerService));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.CORE_API_PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix} `);
}

bootstrap();
