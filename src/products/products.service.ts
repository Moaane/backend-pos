import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(readonly db: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return await this.db.product.create({ data: createProductDto });
  }

  async findAll() {
    return await this.db.product.findMany({
      include: { category: true, productType: true },
    });
  }

  async findAllByCategory(categoryId: string) {
    return await this.db.product.findMany({
      where: { categoryId: categoryId },
    });
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
