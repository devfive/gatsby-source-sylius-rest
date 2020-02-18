import { SourceNodesArgs } from 'gatsby';
import { getAllLatestProducts } from './data/getAllLatestProducts';
import { getAllTaxons } from './data/getAllTaxons';
import { LocalizedCollection } from './data/getLocalizedCollections';
import { createLinkedNodes } from './nodes/createLinkedNodes';
import { getProductNodes } from './nodes/getProductNodes';
import { getTaxonNodes } from './nodes/getTaxonNodes';
import { getDefaultOptions } from './options/getDefaultOptions';
import { ProductNode } from './schemas/Nodes/Product';
import { TaxonNode } from './schemas/Nodes/Taxon';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { SyliusProduct, SyliusTaxon } from './schemas/Sylius';

export async function sourceNodes(
  {
    actions,
    cache,
    createNodeId,
    createContentDigest,
    store,
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

  const localeTaxons: Array<LocalizedCollection<SyliusTaxon>> = await getAllTaxons(url, locales);
  if (localeTaxons.length) {
    localeTaxons.forEach(async ({ collection: taxons, locale }) => {
      const taxonNodes: TaxonNode[] = getTaxonNodes(
        taxons,
        locale,
        createNodeId,
        createContentDigest,
      );

      await createLinkedNodes(taxonNodes, createNode, createParentChildLink);
    });
  } else {
    reporter.warn('[Sylius Source] No taxons has been found!');
  }

  const localeProducts: Array<LocalizedCollection<SyliusProduct>> = await getAllLatestProducts(
    url,
    locales,
  );

  if (localeProducts.length) {
    localeProducts.forEach(async ({ collection: products, locale }) => {
      const productNodes: ProductNode[] = await getProductNodes(
        products,
        locale,
        createNodeId,
        createContentDigest,
        {
          cache,
          createNode,
          store,
          reporter,
        },
      );

      productNodes.forEach(async (node: ProductNode) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const imageNode of node.images) {
          // eslint-disable-next-line no-await-in-loop
          await createNode(imageNode);
        }

        await createNode(node);
      });
    });
  } else {
    reporter.warn('[Sylius Source] No products has been found!');
  }
}
