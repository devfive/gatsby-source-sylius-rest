import { NodeInput } from 'gatsby';
import { ObjectTypeComposerAsObjectDefinition } from 'graphql-compose';
import { ImageNode } from './Image';
import { BaseProductTaxonsNode } from './ProductTaxons';
import { BaseProductVariantNode } from './ProductVariant';
import { BaseAssociationTypeNode } from './AssociationType';

export interface BaseProductNode {
  // attributes: SyliusAttribute[];
  associations: BaseAssociationTypeNode[];
  averageRating?: number;
  channelCode: string;
  code: string;
  description?: string;
  images: ImageNode[];
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

export const productSchema: ObjectTypeComposerAsObjectDefinition<any, any> = {
  name: 'SyliusProduct',
  fields: {
    // attributes: 'SyliusAttribute[]',
    associations: '[SyliusAssociationType]',
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
