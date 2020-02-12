import { SourceNodesArgs, NodeInput, Node } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { TaxonsProvider } from './providers/TaxonsProvider';
import { SyliusTaxon } from './schemas/Sylius/Taxon';
import { getTaxonNodes } from './nodes/getTaxonNodes';
import { TaxonNode } from './schemas/Nodes/Taxon';

export async function sourceNodes(
  {
    actions,
    createNodeId,
    createContentDigest,
    reporter,
  }: SourceNodesArgs,
  options: SyliusSourcePluginOptions = defaultOptions,
):Promise<void> {
  const { createNode, createParentChildLink } = actions;
  const { debug, url } = options;

  if (debug) {
    reporter.info('[Sylius Source] sourceNodes');
  }

  if (!url) {
    throw new Error('Missing `url` param!');
  }

  const taxonsProvider: TaxonsProvider = new TaxonsProvider({ url });
  const taxons: SyliusTaxon[] | null = await taxonsProvider.getRecords();

  if (taxons) {
    const taxonNodes: TaxonNode[] = getTaxonNodes(taxons, createNodeId, createContentDigest);

    taxonNodes.forEach(async (node: TaxonNode) => {
      await createNode(node);
    });

    taxonNodes.forEach((parent: TaxonNode, index: number, nodes: TaxonNode[]) => {
      if (!parent.children) {
        return;
      }

      const childNodes: TaxonNode[] = parent.children
        .map((id: string) => {
          return nodes.find((childNode: TaxonNode) => childNode.id === id);
        })
        .filter((childNode: TaxonNode | undefined): childNode is TaxonNode => !!childNode);

      childNodes.forEach((child: TaxonNode) => {
        if (!parent.parent || !child.parent) {
          return;
        }

        // @todo: remove toNode when https://github.com/gatsbyjs/gatsby/issues/19993 will be fixed
        createParentChildLink({
          parent: nodeInputToNode(parent),
          child: nodeInputToNode(child),
        });
      });
    });
  } else {
    reporter.warn('[Sylius Source] No taxons has been found!');
  }
}

function nodeInputToNode(nodeInput: NodeInput): Node {
  return {
    ...nodeInput,
    parent: nodeInput.parent || '',
    children: nodeInput.children || [],
    internal: {
      ...nodeInput.internal,
      owner: nodeInput.owner as string || 'gatsby-source-sylius-own',
    },
  };
}
