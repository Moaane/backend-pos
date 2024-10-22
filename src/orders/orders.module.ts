import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderItemsService } from 'src/order-items/order-items.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrderItemsService],
})
export class OrdersModule {}
