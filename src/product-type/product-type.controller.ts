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
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import {
  CreateProductTypeDto,
  CreateProductTypeSchema,
} from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ProductTypeInterface } from './interfaces/product-type.interface';
import { UpdateCategorySchema } from 'src/categories/dto/update-category.dto';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly service: ProductTypeService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductTypeSchema))
  async create(
    @Body() createProductTypeDto: CreateProductTypeDto,
  ): Promise<ProductTypeInterface> {
    try {
      return await this.service.create(createProductTypeDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll(): Promise<ProductTypeInterface[]> {
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
  async findOne(@Param('id') id: string): Promise<ProductTypeInterface> {
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
  @UsePipes(new ZodValidationPipe(UpdateCategorySchema))
  async update(@Body() updateProductTypeDto: UpdateProductTypeDto) {
    try {
      return await this.service.update(updateProductTypeDto);
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
