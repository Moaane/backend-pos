import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(readonly db: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
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

  async update(updateOrderItemDto: UpdateOrderItemDto) {
    const { id } = updateOrderItemDto;

    await this.findOne(id);

    return await this.db.orderItem.update({
      where: { id: id },
      data: updateOrderItemDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.db.orderItem.delete({ where: { id: id } });
    return;
  }
}
