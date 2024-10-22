import { Product } from '@prisma/client';
import { CategoryInterface } from 'src/categories/intefaces/category.interface';
import { ProductTypeInterface } from 'src/product-type/interfaces/product-type.interface';

export interface ProductInterface {
  id: string;
  name: string;
  price: number;
  categoryId: string | null;
  productTypeId: string | null;
  category?: CategoryInterface | null;
  productType?: ProductTypeInterface | null;
}