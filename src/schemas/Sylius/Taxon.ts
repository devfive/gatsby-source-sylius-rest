import { SyliusImage } from './Image';

export interface SyliusTaxon {
  children: SyliusTaxon[];
  code: string;
  description: string;
  images: SyliusImage[];
  name: string;
  position: number;
  slug: string;
}
