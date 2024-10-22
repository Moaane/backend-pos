import { ProductType } from '@prisma/client';

export class ProductTypeEntity implements ProductType {
  id: string;
  name: string;
}
