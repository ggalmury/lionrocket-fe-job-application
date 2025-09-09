import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";

import AppModule from "@/app.module";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "http://localhost:5173" });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
