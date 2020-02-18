import { NodeInput } from 'gatsby';
import { ImageNode } from '../schemas/Nodes';

export function isImageNode(node: NodeInput): node is ImageNode {
  return node.internal.type === 'SyliusImage';
}
