import { values } from 'lodash';
import { ImageNode, ProductNode } from '../schemas/Nodes';
import { SyliusProduct } from '../schemas/Sylius';
import { getImageNodes } from './getImageNodes';

type CreateNodeIdFunction = Function;
type CreateContentDigestFunction = (input: any) => string;

interface GetProductNodesOptions {
  cache: any;
  createNode: any;
  getCache: any;
  store: any;
  reporter: any;
}

export async function getProductNodes(
  products: SyliusProduct[],
  locale: string,
  createNodeId: CreateNodeIdFunction,
  createContentDigest: CreateContentDigestFunction,
  options: GetProductNodesOptions,
): Promise<ProductNode[]> {
  return Promise.all(products.map((product: SyliusProduct) => {
    return getProductNode(product, locale, createNodeId, createContentDigest, options);
  }));
}

async function getProductNode(
  product: SyliusProduct,
  locale: string,
  createNodeId: CreateNodeIdFunction,
  createContentDigest: CreateContentDigestFunction,
  options: GetProductNodesOptions,
): Promise<ProductNode> {
  const {
    cache,
    createNode,
    getCache,
    store,
    reporter,
  } = options;

  const content: string = JSON.stringify(product);
  const id: string = createNodeId(`product-${locale}-${product.code}`);
  const images: ImageNode[] = await getImageNodes(
    product.images,
    {
      cache,
      createContentDigest,
      createNode,
      createNodeId,
      getCache,
      store,
      reporter,
    },
  );

  return {
    ...product,
    locale,
    id,
    variants: values(product.variants),
    images,
    internal: {
      type: 'SyliusProduct',
      content,
      contentDigest: createContentDigest(content),
    },
  };
}
