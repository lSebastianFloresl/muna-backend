import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  console.log("STARTING APP")

  const app = await NestFactory.create(AppModule)

  console.log("AFTER APP CREATE")

  app.enableCors()

  await app.listen(process.env.PORT || 3000)

  console.log("SERVER STARTED")
}