import { Time } from '@angular/common';

export interface Establishment {
  id: number;
  name: string;
  description: string;
  address: string;
  number: string;
  phone: number;
  image: string;
  thumbnail: string;
  active: boolean;
  delivery_fee: number;
  minimum_value: number;
  delivery_time_min: number;
  delivery_time_max: number;
  type: string;
  opening: [];
}
