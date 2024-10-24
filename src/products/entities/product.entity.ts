import { Product } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class ProductEntity implements Product {
  id: string;
  name: string;
  price: number;
  categoryId: string | null;
  productTypeId: string | null;
  image: JsonValue;
}
