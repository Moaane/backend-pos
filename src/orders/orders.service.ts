import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderItemsService } from 'src/order-items/order-items.service';

@Injectable()
export class OrdersService {
  constructor(
    readonly db: PrismaService,
    readonly itemService: OrderItemsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);

    const order = await this.db.order.create({
      data: {
        basePrice: createOrderDto.basePrice,
        discount: createOrderDto.discount,
        tax: createOrderDto.tax,
        totalPrice: createOrderDto.totalPrice,
        staffId: createOrderDto.staffId,
        staffName: createOrderDto.staffName,
      },
    });

    console.log(createOrderDto.orderItems);

    const orderItems = await Promise.all(
      createOrderDto.orderItems.map(async (item) => {
        const dataOrderItem = {
          productId: item.productId,
          productName: item.productName,
          productPrice: item.productPrice,
          quantity: item.quantity,
          orderId: order.id,
        };

        await this.itemService.create(dataOrderItem);
      }),
    );

    return order;
  }

  async findAll(items: boolean) {
    if (items) {
      return await this.db.order.findMany({ include: { orderItems: true } });
    }
    return await this.db.order.findMany();
  }

  async countOrdersByProduct(productId: string) {
    return await this.db.order.count({
      where: { orderItems: { some: { productId: productId } } },
    });
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
