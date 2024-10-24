import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateOptions } from 'src/common/types/pagination.type';
import { paginator } from 'src/common/paginator/paginator';
import { CategoryInterface } from './intefaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(readonly db: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.db.category.create({ data: createCategoryDto });
  }

  async findAllByProduct(
    search: string,
    order: string,
    options: PaginateOptions,
  ) {
    const paginate = paginator(options);
    const categories = await paginate<CategoryInterface, any>(
      this.db.category,
      {
        where: {
          name: {
            contains: search,
          },
        },
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
        orderBy: {
          products: {
            _count: order === 'desc' ? 'desc' : 'asc',
          },
        },
      },
      options,
    );
    return categories;
  }

  async findAllWithPagination(search: string, options: PaginateOptions) {
    const paginate = paginator(options);
    const categories = await paginate<CategoryInterface, any>(
      this.db.category,
      {
        where: { name: { contains: search } },
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
        orderBy: {
          products: {
            _count: 'asc',
          },
        },
      },
      options,
    );
    return categories;
  }

  async findAll(search: string) {
    const categories = await this.db.category.findMany({
      where: { name: { contains: search } },
    });
    return categories;
  }

  async findOne(id: string) {
    const category = await this.db.category.findUnique({ where: { id: id } });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const { id } = updateCategoryDto;

    await this.findOne(id);

    return await this.db.category.update({
      where: { id: id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.db.category.delete({ where: { id: id } });
    return [];
  }
}
