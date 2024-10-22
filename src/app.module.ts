import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CategoriesModule } from './categories/categories.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { FormatResponseInterceptor } from './common/interceptors/format-response.interceptor';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  imports: [PrismaModule, ProductsModule, CategoriesModule, ProductTypeModule, OrdersModule, OrderItemsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: FormatResponseInterceptor },
  ],
})
export class AppModule {}
