import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({       //* using this to set a specific pipe globally for all the project files
    whitelist: true, //! using this to ensure that no one could send extra data to the controller, 
                    //! The extra data will be ignored and the rest will pass succesfully
    forbidNonWhitelisted: true,    //~ will throw an error if there is any extra data sent to the controller
    transform: true
  }))

  app.use(cookieParser())
  

  const config = new DocumentBuilder()
    .setTitle("My First NestJs App")
    .setDescription("API Documentation for my project")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // The Swagger UI will be at /swagger
  
  await app.listen(process.env.PORT!);
  console.log(`process.env.PORT ${process.env.PORT}`)
}
bootstrap();
