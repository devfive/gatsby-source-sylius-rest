import { Reporter } from 'gatsby';
import { values } from 'lodash';
import { AssociationTypeNode, BaseAssociationTypeNode } from '../schemas/Nodes';
import { SyliusAssociations } from '../schemas/Sylius/Associations';
import { SyliusProduct } from '../schemas/Sylius/Product';

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
    createContentDigest,
    createNodeId,
    reporter,
  } = options;

  const associationsIds: string[] = Object.keys(associations);
  const associationsNodes: Array<AssociationTypeNode> = associationsIds
    .map((code: string) => {
      const node: BaseAssociationTypeNode = {
        code,
        locale,
        productCode,
        products: associations[code].map((product: SyliusProduct) => {
          return {
            ...product,
            locale,
            images: [],
            variants: values(product.variants),
          };
        }),
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

  reporter.warn(JSON.stringify(associationsNodes));
  // const imagesPromises: Array<Promise<ImageNode>> = images.map(async (image: SyliusImage) => {
  //   const imageId: string = createNodeId(`image-${image.path}`);
  //   const imageContent: string = JSON.stringify(image);
  //   const fileNode: FileSystemNode = await createRemoteFileNode({
  //     cache,
  //     getCache,
  //     createNode,
  //     createNodeId,
  //     parentNodeId: imageId,
  //     store,
  //     url: image.cachedPath,
  //     reporter,
  //   } as CreateRemoteFileNodeArgs);

  //   return {
  //     ...image,
  //     file: fileNode,
  //     id: imageId,
  //     internal: {
  //       type: 'SyliusAssociationType',
  //       content: imageContent,
  //       contentDigest: createContentDigest(imageContent),
  //     },
  //   };
  // });

  return Promise.all(associationsNodes);
}
