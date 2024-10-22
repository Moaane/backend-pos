import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  name: string;
  price: number;
  categoryId: string | null;
  productTypeId: string | null;
}
