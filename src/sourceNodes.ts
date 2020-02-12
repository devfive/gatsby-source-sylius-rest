import { SourceNodesArgs } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { TaxonsProvider } from './providers/TaxonsProvider';
import { SyliusTaxon } from './schemas/Sylius/Taxon';
import { getTaxonNodes } from './nodes/getTaxonNodes';
import { TaxonNode } from './schemas/Nodes/Taxon';

export async function sourceNodes(
  { actions, createNodeId, createContentDigest, reporter }: SourceNodesArgs,
  options: SyliusSourcePluginOptions = defaultOptions,
):Promise<void> {
  const { createNode } = actions;
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
    getTaxonNodes(taxons, createNodeId, createContentDigest)
      .forEach(async (node: TaxonNode) => {
        await createNode(node);
      });
  } else {
    reporter.warn('[Sylius Source] No taxons has been found!');
  }
}
