import { ComposeObjectTypeConfig } from 'graphql-compose';

export interface BaseProductPriceNode {
  current: number;
  currency: string;
}

export const productPriceSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusProductPrice',
  fields: {
    current: 'Int!',
    currency: 'String!',
  },
};
