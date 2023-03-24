import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const title = 'Knight API';
const description = 'Knight API';
const version = require('../../package.json').version;

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */

export const swaggerConfig = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .setExternalDoc('Postman/Insomnia Collection', '/api/v1/swagger-json')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/v1/swagger', app, document);
};
