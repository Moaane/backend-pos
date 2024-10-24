import { OrderItem } from '@prisma/client';

export class OrderItemEntity  {
  id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productId: string | null;
  orderId: string;
}
