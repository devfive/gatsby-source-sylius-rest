import { Reporter } from 'gatsby';
import { FileSystemNode, createRemoteFileNode, CreateRemoteFileNodeArgs } from 'gatsby-source-filesystem';
import { ImageNode } from '../schemas/Nodes';
import { SyliusImage } from '../schemas/Sylius';

type CreateNodeIdFunction = Function;
type CreateContentDigestFunction = (input: any) => string;

export interface GetImageNodesOptions {
  cache: any;
  createContentDigest: CreateContentDigestFunction;
  createNode: any;
  createNodeId: CreateNodeIdFunction;
  getCache: any;
  store: any;
  reporter: Reporter;
}

export async function getImageNodes(
  images: SyliusImage[],
  options: GetImageNodesOptions,
): Promise<Array<ImageNode>> {
  const {
    cache,
    createContentDigest,
    createNode,
    createNodeId,
    getCache,
    store,
    reporter,
  } = options;

  const imagesPromises: Array<Promise<ImageNode>> = images.map(async (image: SyliusImage) => {
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
  });

  return Promise.all(imagesPromises);
}
