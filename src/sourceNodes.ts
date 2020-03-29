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
): Promise<any> {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);
  const { locales, url } = options;
  const { createNode, createParentChildLink } = actions;

  reportDebug(reporter, options, '[Sylius Source] sourceNodes');

  if (!url) {
    throw new Error('Missing `url` param!');
  }

  const taxonsPromises: Array<Promise<any>> = [];
  const localeTaxons: Array<LocalizedCollection<SyliusTaxon>> = await getAllTaxons(url, locales);

  if (localeTaxons.length) {
    reportDebug(reporter, options, '[Sylius Source] source taxons');

    localeTaxons.forEach(async ({ collection: taxons, locale }) => {
      reportDebug(reporter, options, `[Sylius Source] source taxons - ${locale} (${taxons.length})`);

      const taxonNodes: TaxonNode[] = getTaxonNodes(
        taxons,
        locale,
        createNodeId,
        createContentDigest,
      );

      taxonsPromises.push(
        createLinkedNodes(taxonNodes, createNode, createParentChildLink),
      );
    });
  } else {
    report(reporter, '[Sylius Source] No taxons has been found!', 'warn');
  }

  const productsPromises: Array<Promise<any>> = [];
  const localeProducts: Array<LocalizedCollection<SyliusProduct>> = await getAllLatestProducts(
    url,
    locales,
  );

  if (localeProducts.length) {
    reportDebug(reporter, options, '[Sylius Source] source products');

    localeProducts.forEach(async ({ collection: products, locale }) => {
      reportDebug(reporter, options, `[Sylius Source] source products - ${locale} (${products.length})`);

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

      const productNodesPromises: Array<Promise<any>> = productNodes
        .map(async (node: ProductNode) => {
          const imagesNodesPromises: Array<Promise<any>> = node.images
            .map(async (imageNode) => {
              await createNode(imageNode);
            });

          return Promise
            .all(imagesNodesPromises)
            .then(() => createNode(node));
        });

      productsPromises.push(Promise.all(productNodesPromises));
    });
  } else {
    report(reporter, '[Sylius Source] No products has been found!', 'warn');
  }

  return Promise.all([
    ...taxonsPromises,
    ...productsPromises,
  ]);
}
