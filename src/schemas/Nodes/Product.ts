import { NodeInput } from 'gatsby';

export interface BaseProductNode {
  // attributes: SyliusAttribute[];
  averageRating?: number;
  channelCode: string;
  code: string;
  description?: string;
  // images: SyliusImage[];
  metaKeywords?: string;
  metaDescription?: string;
  name: string;
  shortDescription?: string;
  slug: string;
  // taxons: SyliusProductTaxon;
  // variants: { [key: string]: SyliusProductVariant };
}

export type ProductNode = BaseProductNode & NodeInput;
