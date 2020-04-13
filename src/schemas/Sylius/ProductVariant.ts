import { SyliusPrice } from './Price';
import { SyliusImage } from './Image';

export interface SyliusProductVariant {
  axis: string[];
  code: string;
  images: SyliusImage[];
  name: string | null;
  nameAxis: { [key: string]: string };
  originalPrice: SyliusPrice;
  price: SyliusPrice;
}
