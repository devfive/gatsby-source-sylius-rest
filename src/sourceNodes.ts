import { SourceNodesArgs } from 'gatsby';
import { sourceTaxons } from './actions/source/sourceTaxons';
import { getAllLatestProducts } from './data/getAllLatestProducts';
import { LocalizedCollection } from './data/getLocalizedCollections';
import { getProductNodes } from './nodes/getProductNodes';
import { getDefaultOptions } from './options/getDefaultOptions';
import { ProductNode } from './schemas/Nodes';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { SyliusProduct } from './schemas/Sylius';
import { reportDebug, report } from './utils/reportDebug';

export async function sourceNodes(
  args: SourceNodesArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
): Promise<any> {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);
  const {
    reporter,
  } = args;
  reportDebug(reporter, options, '------------');
  reportDebug(reporter, options, 'Source nodes');
  reportDebug(reporter, options, '------------');

  await sourceTaxons(args, options);
  await sourceProducts(args, options);
}

async function sourceProducts(
  {
    actions,
    cache,
    createNodeId,
    createContentDigest,
    getCache,
    reporter,
    store,
  }: SourceNodesArgs,
  options: SyliusSourcePluginOptions,
): Promise<void> {
  const { locales, url } = options;
  const { createNode } = actions;

  if (!url) {
    throw new Error('Missing `url` param!');
  }

  reportDebug(reporter, options, 'Source products');
  reportDebug(reporter, options, '------------');

  return Promise.resolve()
    .then(() => getAllLatestProducts(url, locales))
    .then((localizedProducts: Array<LocalizedCollection<SyliusProduct>>) => {
      if (!localizedProducts.length) {
        report(reporter, 'No products has been found!', 'warn');

        return Promise.resolve();
      }

      const productsPromises: Array<Promise<void>> = [];

      localizedProducts.forEach(({ collection: products, locale }) => {
        reportDebug(reporter, options, `Source products - ${locale} (${products.length})`);

        const productPromise: Promise<void> = Promise.resolve()
          .then(() => getProductNodes(
            products,
            locale,
            createNodeId,
            createContentDigest,
            {
              cache,
              createNode,
              getCache,
              reporter,
              store,
            },
          ))
          .then((productNodes: ProductNode[]) => {
            const productNodesPromises: Array<Promise<any>> = [];

            productNodes.forEach((node: ProductNode) => {
              const imagesNodesPromises: Array<Promise<any>> = [];

              node.images.forEach((imageNode) => {
                imagesNodesPromises.push(
                  Promise.resolve()
                    .then(() => createNode(imageNode)),
                );
              });

              productNodesPromises.push(
                Promise
                  .all(imagesNodesPromises)
                  .then(() => createNode(node)),
              );
            });

            return Promise.all(productNodesPromises)
              .then(() => reportDebug(reporter, options, 'Locale products sourced'));
          });

        productsPromises.push(productPromise);
      });

      return Promise.all(productsPromises)
        .then(() => reportDebug(reporter, options, 'Products sourced'));
    });
}
