import { NodeInput } from 'gatsby';
import { ComposeObjectTypeConfig } from 'graphql-compose';
import { SyliusProductTaxons } from '../Sylius/ProductTaxons';

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
  taxons: SyliusProductTaxons;
  // variants: { [key: string]: SyliusProductVariant };
}

export type ProductNode = BaseProductNode & NodeInput;

export const productSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusProduct',
  fields: {
    // attributes: 'SyliusAttribute[]',
    averageRating: 'Int',
    channelCode: 'String!',
    code: 'String!',
    description: 'String',
    // images: 'SyliusImage[]',
    locale: 'String!',
    metaKeywords: 'String',
    metaDescription: 'String',
    name: 'String!',
    shortDescription: 'String',
    slug: 'String!',
    taxons: 'SyliusProductTaxons',
    // variants: '{ [key: string]: SyliusProductVariant }',
  },
  interfaces: [
    'Node',
  ],
  extensions: {
    infer: false,
  },
};
