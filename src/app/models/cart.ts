import { Product } from './product';
export interface Cart {
  products: Product[];
  delivery_fee: [];
  total: number;
}
