import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { currentFileName } from "./utils";

// Application entrypoint
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();
  app.setGlobalPrefix("/v1");

  const port: number = +(process.env.AEGIS_PORT ?? 4567);

  await app.listen(port, "0.0.0.0", async (error: Error, address: string) => {
    if (error) throw error;
    Logger.log(`Starting service. Listening at: ${address}`, currentFileName());
  });
}

bootstrap().catch((error) => {
  console.error("bootstrap process failed:", error);
});
