import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/configurations';
import morgan from 'morgan';

const bootstrap = async () => {
  const configs = config();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  morgan.token('graphql-query', (req: any) => {
    const {query, variables, operationName} = req.body;
    return `GRAPHQL: \nOperation Name: ${operationName} \nQuery: ${query} \nVariables: ${JSON.stringify(variables)}`;
  });
  app.use(morgan(':graphql-query'));
  await app.listen(configs.port, () => {
    console.log(`Nest app listening on port ${configs.port}`);
  });
};
bootstrap();
