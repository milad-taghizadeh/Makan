import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerConfigInit(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Online Education')
    .setDescription('api endpoints of Online Education system')
    .setVersion('1.0')
    .addTag('TEST')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_ENDPOINT, app, document);
}
