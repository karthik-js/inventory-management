export interface ProductResponse {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  value: number;
  quantity: number;
  price: number;
}
