// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import 'reflect-metadata';
import { AppModule } from '@app/di/AppModule';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyHelmet from '@fastify/helmet';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  console.log(process.env);
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.register(fastifyHelmet);
  await app.register(fastifyCookie);
  await app.register(fastifyCsrf);
  await app.register(fastifyCors);

  // app.useLogger(app.resolve(LoggerService));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks();

  const envConfig = app.get(ConfigService);

  const port = envConfig.get('CORE_API_PORT');
  await app.listen(port);
  Logger.log(`🚀 Application is running on:  ${await app.getUrl()}`);
}

bootstrap();
