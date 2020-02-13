import { ProductNode } from '../schemas/Nodes/Product';
import { SyliusProduct } from '../schemas/Sylius/Product';

type CreateNodeIdFunction = Function;
type CreateContentDigestFunction = (input: any) => string;

export function getProductNodes(
  products: SyliusProduct[],
  locale: string,
  createNodeId: CreateNodeIdFunction,
  createContentDigest: CreateContentDigestFunction,
): ProductNode[] {
  return products.map((product: SyliusProduct) => {
    return getProductNode(product, locale, createNodeId, createContentDigest);
  });
}

function getProductNode(
  product: SyliusProduct,
  locale: string,
  createNodeId: CreateNodeIdFunction,
  createContentDigest: CreateContentDigestFunction,
): ProductNode {
  const content: string = JSON.stringify(product);
  const id: string = createNodeId(`product-${locale}-${product.code}`);

  return {
    ...product,
    locale,
    id,
    internal: {
      type: 'SyliusProduct',
      content,
      contentDigest: createContentDigest(content),
    },
  };
}
