import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  InternalServerErrorException,
  HttpException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  CreateProductSchema,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductSchema,
} from './dto/update-product.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ProductInterface } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductInterface> {
    try {
      return await this.service.create(createProductDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Get('')
  async findAll(
    @Query('category') category: string,
  ): Promise<ProductInterface[]> {
    try {
      if (category) {
        return await this.service.findAllByCategory(category);
      }
      return await this.service.findAll();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductInterface> {
    try {
      return await this.service.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(UpdateProductSchema))
  async update(
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductInterface> {
    try {
      return await this.service.update(updateProductDto);
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
