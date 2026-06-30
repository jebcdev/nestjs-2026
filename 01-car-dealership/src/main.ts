import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  /*  */

  const logger: Logger = new Logger('----- Bootstrap -----');

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Car Dealership')
    .setDescription('This is an educational project builded to learn NestJS')
    .setVersion('0.0.1')
    .addTag('Car Dealership')

    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  // Obtener ConfigService del contenedor de dependencias
  const configService = app.get(ConfigService);

  const PORT: number = configService.get<number>('PORT') || 3000;
  const API_PREFIX: string =
    configService.get<string>('API_PREFIX') || 'api/v1';

  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Allow implicit conversion of types
      },
    }),
  );

  // Configuración de CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  await app.listen(PORT);
  logger.log(
    `Application is running on: http://localhost:${PORT}/${API_PREFIX}`,
  );
  logger.log(
    `Environment: ${configService.get<string>('NODE_ENV') || 'development'}`,
  );
}
bootstrap();
