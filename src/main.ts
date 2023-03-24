require('module-alias/register');
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, repl } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './config/http-exception-filter';
import { swaggerConfig } from './config/swagger.config';
async function bootstrap() {
  const environment = process.env.ENV;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true
  });

  app.use(helmet());

  const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };

  app.enableCors(options);

  environment !== 'PROD' && (await repl(AppModule));

  app.setGlobalPrefix('/api/v1', {
    exclude: [
      // { path: '/health', method: RequestMethod.GET },
    ],
  });

  app.useGlobalPipes(new ValidationPipe());

  swaggerConfig(app);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT, async () => {
    console.log(`\nEnvironment: ${environment}`);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Swagger is running on: ${await app.getUrl()}/api/v1/swagger\n`);

  });
}
bootstrap();
