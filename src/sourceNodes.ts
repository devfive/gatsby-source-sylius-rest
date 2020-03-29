import { SourceNodesArgs } from 'gatsby';
import { getAllLatestProducts } from './data/getAllLatestProducts';
import { getAllTaxons } from './data/getAllTaxons';
import { LocalizedCollection } from './data/getLocalizedCollections';
import { createLinkedNodes } from './nodes/createLinkedNodes';
import { getProductNodes } from './nodes/getProductNodes';
import { getTaxonNodes } from './nodes/getTaxonNodes';
import { getDefaultOptions } from './options/getDefaultOptions';
import { ProductNode, TaxonNode } from './schemas/Nodes';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { SyliusProduct, SyliusTaxon } from './schemas/Sylius';
import { reportDebug, report } from './utils/reportDebug';

export async function sourceNodes(
  {
    actions,
    cache,
    createNodeId,
    createContentDigest,
    getCache,
    store,
    reporter,
  }: SourceNodesArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
):Promise<void> {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);
  const { locales, url } = options;
  const { createNode, createParentChildLink } = actions;

  reportDebug(reporter, options, '[Sylius Source] sourceNodes');

  if (!url) {
    throw new Error('Missing `url` param!');
  }

  const localeTaxons: Array<LocalizedCollection<SyliusTaxon>> = await getAllTaxons(url, locales);
  if (localeTaxons.length) {
    await localeTaxons.forEach(async ({ collection: taxons, locale }) => {
      const taxonNodes: TaxonNode[] = getTaxonNodes(
        taxons,
        locale,
        createNodeId,
        createContentDigest,
      );

      await createLinkedNodes(taxonNodes, createNode, createParentChildLink);
    });
  } else {
    report(reporter, '[Sylius Source] No taxons has been found!', 'warn');
  }

  const localeProducts: Array<LocalizedCollection<SyliusProduct>> = await getAllLatestProducts(
    url,
    locales,
  );

  if (localeProducts.length) {
    await localeProducts.forEach(async ({ collection: products, locale }) => {
      const productNodes: ProductNode[] = await getProductNodes(
        products,
        locale,
        createNodeId,
        createContentDigest,
        {
          cache,
          createNode,
          getCache,
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
    report(reporter, '[Sylius Source] No products has been found!', 'warn');
  }
}
