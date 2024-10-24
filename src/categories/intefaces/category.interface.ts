export interface CategoryInterface {
  id: string;
  name: string;
  totalProducts?: number;
  totalProductsSold?: number;
  _count?: {
    products: number;
  };
  products?: [
    {
      id: string;
      orderItems: [
        {
          quantity: number;
        },
      ];
    },
  ];
  // products?: any;
}
