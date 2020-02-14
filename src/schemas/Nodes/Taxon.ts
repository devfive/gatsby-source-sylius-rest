import { NodeInput } from 'gatsby';
import { ComposeObjectTypeConfig } from 'graphql-compose';
import { BaseImageNode } from './Image';

export interface BaseTaxonNode {
  code: string,
  description: string,
  images: BaseImageNode[];
  name: string,
  locale: string,
  position: number,
  slug: string,
}

export type TaxonNode = BaseTaxonNode & NodeInput;

export const taxonSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusTaxon',
  fields: {
    code: 'String!',
    description: 'String',
    images: '[SyliusImage]',
    locale: 'String!',
    name: 'String!',
    position: 'Int!',
    slug: 'String!',
  },
  interfaces: [
    'Node',
  ],
  extensions: {
    childOf: {
      types: ['SyliusTaxon'],
    },
    infer: false,
  },
};
