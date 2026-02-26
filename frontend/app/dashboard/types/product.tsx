export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  images: [{ id: number; url: string }];
};
