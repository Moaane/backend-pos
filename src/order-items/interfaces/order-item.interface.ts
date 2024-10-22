export interface OrderItemInterface {
  productName: string;
  productPrice: number;
  quantity: number;
  productId?: string | null;
  orderId: string | null;
}
