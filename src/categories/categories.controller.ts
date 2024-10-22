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
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  CreateCategorySchema,
} from './dto/create-category.dto';
import {
  UpdateCategoryDto,
  UpdateCategorySchema,
} from './dto/update-category.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CategoryInterface } from './intefaces/category.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCategorySchema))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryInterface> {
    try {
      return await this.service.create(createCategoryDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll(): Promise<CategoryInterface[]> {
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
  async findOne(@Param('id') id: string): Promise<CategoryInterface> {
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
  @UsePipes(new ZodValidationPipe(UpdateCategorySchema))
  update(
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryInterface> {
    try {
      return this.service.update(updateCategoryDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    try {
      return this.service.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
