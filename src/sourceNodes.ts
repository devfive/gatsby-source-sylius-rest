import { SourceNodesArgs, NodeInput, Node } from 'gatsby';
import { getTaxonNodes } from './nodes/getTaxonNodes';
import { getDefaultOptions } from './options/getDefaultOptions';
import { TaxonsProvider } from './data/providers/TaxonsProvider';
import { TaxonNode } from './schemas/Nodes/Taxon';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { SyliusTaxon } from './schemas/Sylius/Taxon';
import { getPackageName } from './utils/getPackageName';

interface LocaleEntityCollection<T> {
  collection: T[];
  locale: string;
}

export async function sourceNodes(
  {
    actions,
    createNodeId,
    createContentDigest,
    reporter,
  }: SourceNodesArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
):Promise<void> {
  const { debug, locales, url }: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);
  const { createNode, createParentChildLink } = actions;

  if (debug) {
    reporter.info('[Sylius Source] sourceNodes');
  }

  if (!url) {
    throw new Error('Missing `url` param!');
  }

  const taxonsProvider: TaxonsProvider = new TaxonsProvider({ url });
  const localeTaxons: Array<LocaleEntityCollection<SyliusTaxon>> = await Promise.all(locales.map(async (locale: string) => {
    const collection: SyliusTaxon[] = await taxonsProvider.getRecords({
      queryParameters: {
        params: { locale },
      },
    });

    return {
      collection,
      locale,
    };
  }));

  if (localeTaxons.length) {
    localeTaxons.forEach(({ collection: taxons, locale }) => {
      const taxonNodes: TaxonNode[] = getTaxonNodes(taxons, locale, createNodeId, createContentDigest);

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

          // @todo: remove nodeInputToNode when https://github.com/gatsbyjs/gatsby/issues/19993 will be fixed
          createParentChildLink({
            parent: nodeInputToNode(parent),
            child: nodeInputToNode(child),
          });
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
      owner: nodeInput.owner as string || getPackageName(),
    },
  };
}
