import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(readonly db: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.db.order.create({ data: createOrderDto });
  }

  async findAll() {
    return await this.db.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.db.order.findUnique({ where: { id: id } });

    if (!order) {
      throw new NotFoundException();
    }

    return order;
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const { id } = updateOrderDto;

    await this.findOne(id);

    return await this.db.order.update({
      where: { id: id },
      data: updateOrderDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.db.order.delete({ where: { id: id } });
    return;
  }
}
