import { OrderItemInterface } from 'src/order-items/interfaces/order-item.interface';

export interface OrderInterface {
  id: string;
  basePrice: number;
  discount: number | null;
  tax: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  staffName: string;
  staffId: string | null;
  orderItems?: OrderItemInterface[] | null;
}
