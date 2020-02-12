import { SyliusImage } from './Image';

export interface SyliusTaxon {
  code: string;
  name: string;
  slug: string;
  description: string;
  position: number;
  children: SyliusTaxon[];
  images: SyliusImage[];
}
