import { NodeInput } from 'gatsby';
import { ImageNode } from '../schemas/Nodes/Image';

export function isImageNode(node: NodeInput): node is ImageNode {
  return node.internal.type === 'SyliusImage';
}
