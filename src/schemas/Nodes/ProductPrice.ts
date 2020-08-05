import { ObjectTypeComposerAsObjectDefinition } from 'graphql-compose';

export interface BaseProductPriceNode {
  current: number;
  currency: string;
}

export const productPriceSchema: ObjectTypeComposerAsObjectDefinition<any, any> = {
  name: 'SyliusProductPrice',
  fields: {
    current: 'Int!',
    currency: 'String!',
  },
};
