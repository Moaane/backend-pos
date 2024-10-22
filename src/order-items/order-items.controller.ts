import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import {
  CreateOrderItemDto,
  CreateOrderItemSchema,
} from './dto/create-order-item.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { OrderItemInterface } from './interfaces/order-item.interface';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly service: OrderItemsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateOrderItemSchema))
  async create(
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItemInterface> {
    try {
      return await this.service.create(createOrderItemDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll(): Promise<OrderItemInterface[]> {
    try {
      return await this.service.findAll();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderItemInterface> {
    try {
      return await this.service.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
