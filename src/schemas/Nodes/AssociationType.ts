import { NodeInput } from 'gatsby';
import { ObjectTypeComposerAsObjectDefinition } from 'graphql-compose';
import { BaseProductNode } from './Product';

export type AssociatedProductNode = Omit<BaseProductNode, 'associations'>;

export interface BaseAssociationTypeNode {
  code: string;
  locale: string;
  productCode: string;
  size: number;
  products: AssociatedProductNode[];
}

export type AssociationTypeNode = BaseAssociationTypeNode & NodeInput;

export const associationTypeSchema: ObjectTypeComposerAsObjectDefinition<any, any> = {
  name: 'SyliusAssociationType',
  fields: {
    code: 'String!',
    locale: 'String!',
    productCode: 'String!',
    size: 'Int!',
    products: '[SyliusProduct]',
  },
  interfaces: [
    'Node',
  ],
  extensions: {
    infer: false,
  },
};
