import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { ServerBootstrapError } from "./error";
import { currentFileName } from "./utils";

// Application entrypoint
async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.setGlobalPrefix("/v1");

  const hostname: string = process.env.APP_HOSTNAME ?? "127.0.0.1";
  const port: number = +process.env.APP_PORT ?? 4567;

  await app.listen(port, hostname);

  const appUrl: string = await app.getUrl();
  Logger.log(`Starting service. Listening at: ${appUrl}`, currentFileName());
}

bootstrap().catch((error) => {
  throw new ServerBootstrapError(error, "server failed to start");
});
