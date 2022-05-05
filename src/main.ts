import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { currentFileName } from "./utils";

// Application entrypoint
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  app.enableCors();
  app.setGlobalPrefix("/v1");

  const port: number = +(process.env.APP_PORT ?? 34567);

  await app.listen(port);
  Logger.log(
    `Starting service. Listening at: ${await app.getUrl()}`,
    currentFileName(),
  );
}

bootstrap().catch((error) => {
  console.error("bootstrap process failed:", error);
});
