import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(readonly db: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.db.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return await this.db.category.findMany();
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
    await this.db.category.delete({ where: { id: id } });
    return;
  }
}
