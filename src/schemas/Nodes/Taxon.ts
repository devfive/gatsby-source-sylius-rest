import { NodeInput } from 'gatsby';
import { ComposeObjectTypeConfig } from 'graphql-compose';

export interface BaseTaxonNode {
  code: string,
  description: string,
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
    name: 'String!',
    slug: 'String!',
    locale: 'String!',
    position: 'Int!',
    description: 'String',
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
