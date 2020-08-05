import { NodeInput } from 'gatsby';
import { ObjectTypeComposerAsObjectDefinition } from 'graphql-compose';
import { ImageNode } from './Image';

export interface BaseTaxonNode {
  code: string,
  description: string,
  images: ImageNode[];
  name: string,
  locale: string,
  position: number,
  slug: string,
}

export type TaxonNode = BaseTaxonNode & NodeInput;

export const taxonSchema: ObjectTypeComposerAsObjectDefinition<any, any> = {
  name: 'SyliusTaxon',
  fields: {
    code: 'String!',
    description: 'String',
    images: '[SyliusImage]!',
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
