import { NodeInput } from 'gatsby';
import { ProductNode } from '../schemas/Nodes/Product';

export function isProductNode(node: NodeInput): node is ProductNode {
  return node.internal.type === 'SyliusProduct';
}
