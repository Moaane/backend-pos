import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductTypeService {
  constructor(readonly db: PrismaService) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    return await this.db.productType.create({ data: createProductTypeDto });
  }

  async findAll() {
    return await this.db.productType.findMany();
  }

  async findOne(id: string) {
    const productType = await this.db.productType.findUnique({
      where: { id: id },
    });

    if (!productType) {
      throw new NotFoundException('product type not found');
    }

    return productType;
  }

  async update(updateProductTypeDto: UpdateProductTypeDto) {
    const { id } = updateProductTypeDto;
    await this.findOne(id);

    return await this.db.productType.update({
      where: { id: id },
      data: updateProductTypeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.productType.delete({ where: { id: id } });
    return;
  }
}
