import { Reporter } from 'gatsby';
import { values } from 'lodash';
import {
  AssociationTypeNode,
  BaseAssociationTypeNode,
  ImageNode,
  BaseProductNode,
} from '../schemas/Nodes';
import { SyliusAssociations } from '../schemas/Sylius/Associations';
import { SyliusProduct } from '../schemas/Sylius/Product';
import { getImageNodes } from './getImageNodes';

type CreateNodeIdFunction = Function;
type CreateContentDigestFunction = (input: any) => string;

export interface GetAssociationsNodesOptions {
  cache: any;
  createContentDigest: CreateContentDigestFunction;
  createNode: any;
  createNodeId: CreateNodeIdFunction;
  getCache: any;
  store: any;
  reporter: Reporter;
}

export async function getAssociationsNodes(
  associations: SyliusAssociations,
  productCode: string,
  locale: string,
  options: GetAssociationsNodesOptions,
): Promise<Array<AssociationTypeNode>> {
  const {
    cache,
    createContentDigest,
    createNode,
    createNodeId,
    getCache,
    reporter,
    store,
  } = options;

  const associationsIds: string[] = Object.keys(associations);
  const associationsNodes: Array<Promise<AssociationTypeNode>> = associationsIds
    .map(async (code: string) => {
      const products: BaseProductNode[] = await Promise.all(
        associations[code].map(async (product: SyliusProduct) => {
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
            images,
            variants: values(product.variants),
          };
        }),
      );

      const node: BaseAssociationTypeNode = {
        code,
        locale,
        productCode,
        products,
        size: associations[code].length,
      };

      const content: string = JSON.stringify(node);
      const id: string = createNodeId(`association-${locale}-${productCode}-${node.code}`);

      return {
        ...node,
        id,
        internal: {
          type: 'SyliusAssociationType',
          content,
          contentDigest: createContentDigest(content),
        },
      };
    });

  return Promise.all(associationsNodes);
}
