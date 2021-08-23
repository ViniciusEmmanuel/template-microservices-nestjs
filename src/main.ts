import { ShutdownSignal } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const shutdownSignals = [
  ShutdownSignal.SIGINT,
  ShutdownSignal.SIGTERM,
  ShutdownSignal.SIGQUIT,
];

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {},
    },
  );

  app.useLogger(['debug', 'error', 'log', 'verbose', 'warn']);

  await app.enableShutdownHooks(shutdownSignals).listen();
}
bootstrap();
