import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(readonly db: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    if (!createOrderItemDto.orderId) {
      throw new BadRequestException('order id is required');
    }
    return await this.db.orderItem.create({ data: createOrderItemDto });
  }

  async findAll() {
    return await this.db.orderItem.findMany();
  }

  async findOne(id: string) {
    const orderItem = await this.db.orderItem.findUnique({ where: { id: id } });

    if (!orderItem) {
      throw new NotFoundException('order item not found');
    }

    return orderItem;
  }
}
