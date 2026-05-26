import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  console.log("1 START")

  const app = await NestFactory.create(AppModule)

  console.log("2 AFTER CREATE")

  await app.listen(process.env.PORT || 3000)

  console.log("3 AFTER LISTEN")
}

bootstrap()