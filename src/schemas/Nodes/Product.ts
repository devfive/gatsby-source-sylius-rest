import { NodeInput } from 'gatsby';
import { ComposeObjectTypeConfig } from 'graphql-compose';
import { BaseImageNode } from './Image';
import { BaseProductTaxonsNode } from './ProductTaxons';
import { BaseProductVariantNode } from './ProductVariant';

export interface BaseProductNode {
  // attributes: SyliusAttribute[];
  averageRating?: number;
  channelCode: string;
  code: string;
  description?: string;
  images: BaseImageNode[];
  locale: string;
  metaKeywords?: string;
  metaDescription?: string;
  name: string;
  shortDescription?: string;
  slug: string;
  taxons: BaseProductTaxonsNode;
  variants: BaseProductVariantNode[];
}

export type ProductNode = BaseProductNode & NodeInput;

export const productSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusProduct',
  fields: {
    // attributes: 'SyliusAttribute[]',
    averageRating: 'Float',
    channelCode: 'String!',
    code: 'String!',
    description: 'String',
    images: '[SyliusImage]',
    locale: 'String!',
    metaKeywords: 'String',
    metaDescription: 'String',
    name: 'String!',
    shortDescription: 'String',
    slug: 'String!',
    taxons: 'SyliusProductTaxons',
    variants: '[SyliusProductVariant]',
  },
  interfaces: [
    'Node',
  ],
  extensions: {
    infer: false,
  },
};
