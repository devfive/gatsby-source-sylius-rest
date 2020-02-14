import { ComposeObjectTypeConfig } from 'graphql-compose';

export interface BaseImageNode {
  cachedPath: string;
  path: string;
}

export const imageSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusImage',
  fields: {
    cachedPath: 'String!',
    path: 'String!',
  },
};
