import { NodeInput } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';
import { ComposeObjectTypeConfig } from 'graphql-compose';

export interface BaseImageNode {
  cachedPath: string;
  file: FileSystemNode
  path: string;
}

export type ImageNode = BaseImageNode & NodeInput;

export const imageSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusImage',
  fields: {
    cachedPath: 'String!',
    file: 'File!',
    path: 'String!',
  },
  interfaces: [
    'Node',
  ],
  extensions: {
    infer: false,
  },
};
