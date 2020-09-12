import { SourceNodesArgs } from 'gatsby';
import { getAllLatestProducts } from '../../data/getAllLatestProducts';
import { LocalizedCollection } from '../../data/getLocalizedCollections';
import { getProductNodes } from '../../nodes/getProductNodes';
import { ProductNode } from '../../schemas/Nodes';
import { SyliusSourcePluginOptions } from '../../schemas/Plugin/Options';
import { SyliusProduct } from '../../schemas/Sylius';
import { reportDebug, report } from '../../utils/reportDebug';
import { LocalizedTaxons } from './sourceTaxons';

export async function sourceProducts(
  {
    actions,
    cache,
    createNodeId,
    createContentDigest,
    getCache,
    reporter,
    store,
  }: SourceNodesArgs,
  taxons: LocalizedTaxons,
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

        const productsPromise: Promise<void> = Promise.resolve()
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

        productsPromises.push(productsPromise);
      });

      return Promise.all(productsPromises)
        .then(() => reportDebug(reporter, options, 'Products sourced'));
    });
}
