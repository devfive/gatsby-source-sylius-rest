import { SyliusImage } from './Image';

export interface SyliusTaxon {
  code: string;
  name: string;
  slug: string;
  description: string;
  children: SyliusTaxon[];
  images: SyliusImage[];
}
