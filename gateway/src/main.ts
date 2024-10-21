import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001, 
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000); 

  console.log(`Mikroservis 3001-portda ishlamoqda.`);
  console.log(`Asosiy ilova 3000-portda ishlamoqda.`);
}

bootstrap();
