import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, CreateOrderSchema } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { OrderInterface } from './interfaces/order.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateOrderSchema))
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderInterface> {
    try {
      return await this.service.create(createOrderDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll(@Query('items') items: string) {
    try {
      const isItems = items === 'true';
      const orders = await this.service.findAll(isItems);
      return orders;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderInterface> {
    try {
      return this.service.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  @Patch()
  async update(
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderInterface> {
    try {
      return await this.service.update(updateOrderDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.service.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
