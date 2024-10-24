import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginator } from 'src/common/paginator/paginator';
import { ProductInterface } from './interfaces/product.interface';
import { PaginatedResult } from 'src/common/intefaces/pagination.interface';
import { PaginateOptions } from 'src/common/types/pagination.type';

@Injectable()
export class ProductsService {
  constructor(readonly db: PrismaService) {}
  private readonly defaultOptions: PaginateOptions = { page: 1, perPage: 10 };
  private readonly paginate = paginator(this.defaultOptions);

  async create(createProductDto: CreateProductDto) {
    return await this.db.product.create({ data: createProductDto });
  }

  async findAll(
    search: string,
    options: PaginateOptions,
  ): Promise<PaginatedResult<ProductInterface>> {
    const products = await this.paginate<ProductInterface, any>(
      this.db.product,
      {
        where: {
          name: { contains: search },
        },
        include: { category: true, productType: true },
      },
      options,
    );
    return products;
  }

  async findAllWithCount(
    sort: string,
    search: string,
    options: PaginateOptions,
  ): Promise<PaginatedResult<ProductInterface>> {
    const products = await this.paginate<ProductInterface, any>(
      this.db.product,
      {
        where: {
          name: {
            contains: search,
          },
        },
        include: {
          category: true,
          productType: true,
          _count: {
            select: {
              orderItems: true,
            },
          },
        },
        orderBy: {
          orderItems: { _count: sort === 'desc' ? 'desc' : 'asc' },
        },
      },
      options,
    );

    return products;
  }

  async findAllByCategory(
    categoryId: string,
    search: string,
    options: PaginateOptions,
  ): Promise<PaginatedResult<ProductInterface>> {
    const products = await this.paginate<ProductInterface, any>(
      this.db.product,
      {
        where: { name: { contains: search }, categoryId: categoryId },
      },
      options,
    );

    return products;
  }

  async findOne(id: string) {
    const product = await this.db.product.findUnique({
      where: { id: id },
      include: { category: true, productType: true },
    });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const { id } = updateProductDto;

    await this.findOne(id);

    const updatedProduct = await this.db.product.update({
      where: { id: id },
      data: updateProductDto,
    });

    return updatedProduct;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.db.product.delete({ where: { id: id } });
  }
}
