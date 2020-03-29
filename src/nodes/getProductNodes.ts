import { FileSystemNode, createRemoteFileNode, CreateRemoteFileNodeArgs } from 'gatsby-source-filesystem';
import { values } from 'lodash';
import { ImageNode, ProductNode } from '../schemas/Nodes';
import { SyliusImage, SyliusProduct } from '../schemas/Sylius';

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

  const images: ImageNode[] = await Promise.all(product.images.map(async (image: SyliusImage) => {
    const imageId: string = createNodeId(`image-${image.path}`);
    const imageContent: string = JSON.stringify(image);
    const fileNode: FileSystemNode = await createRemoteFileNode({
      cache,
      getCache,
      createNode,
      createNodeId,
      parentNodeId: imageId,
      store,
      url: image.cachedPath,
      reporter,
    } as CreateRemoteFileNodeArgs);

    return {
      ...image,
      file: fileNode,
      id: imageId,
      internal: {
        type: 'SyliusImage',
        content: imageContent,
        contentDigest: createContentDigest(imageContent),
      },
    };
  }));

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
