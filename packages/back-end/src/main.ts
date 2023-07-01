import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function bootstrap() {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.resolve(__dirname, '.env') });
  } else {
    dotenv.config({ path: path.resolve(__dirname, '../../..', '.env') });
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    console.log(`🚀 Server ready at: http://localhost:3000/graphql`);
  });
}
bootstrap();
