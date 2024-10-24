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
import { PaginatedResult } from 'src/common/intefaces/pagination.interface';
import { PaginateOptions } from 'src/common/types/pagination.type';

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
  async findAll(
    @Query('sort')
    sort: string,
    @Query('order')
    order: string,
    @Query('search')
    search: string,
    @Query() options: PaginateOptions,
  ): Promise<PaginatedResult<CategoryInterface> | CategoryInterface[]> {
    try {
      console.log(options);

      if (sort === 'product') {
        return await this.service.findAllByProduct(search, order, options);
      }
      if (options.page && options.perPage) {
        return await this.service.findAllWithPagination(search, options);
      }

      const c = await this.service.findAll(search);
      console.log(c);
      return c;
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
  remove(@Param('id') id: string) {
    console.log(id);

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
