export interface OrderInterface {
  id: string;
  basePrice: number;
  discount: number | null;
  tax: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  staffId: string;
  
}
