import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { ProductsModule } from './modules/products/products.module'
import { FiltersModule } from './modules/filters/filters.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    FiltersModule,
  ],
})
export class AppModule { }