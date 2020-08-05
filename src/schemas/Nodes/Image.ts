import { NodeInput } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';
import { ObjectTypeComposerAsObjectDefinition } from 'graphql-compose';

export interface BaseImageNode {
  cachedPath: string;
  code?: string;
  file: FileSystemNode;
  path: string;
}

export type ImageNode = BaseImageNode & NodeInput;

export const imageSchema: ObjectTypeComposerAsObjectDefinition<any, any> = {
  name: 'SyliusImage',
  fields: {
    cachedPath: 'String!',
    code: 'String',
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
