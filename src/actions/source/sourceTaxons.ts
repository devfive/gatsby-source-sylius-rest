import { SourceNodesArgs } from 'gatsby';
import { getAllTaxons } from '../../data/getAllTaxons';
import { LocalizedCollection } from '../../data/getLocalizedCollections';
import { createLinkedNodes } from '../../nodes/createLinkedNodes';
import { getTaxonNodes } from '../../nodes/getTaxonNodes';
import { TaxonNode } from '../../schemas/Nodes';
import { SyliusSourcePluginOptions } from '../../schemas/Plugin';
import { SyliusTaxon } from '../../schemas/Sylius';
import { reportDebug, report } from '../../utils/reportDebug';

export async function sourceTaxons(
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
  const { createNode, createParentChildLink } = actions;

  if (!url) {
    throw new Error('Missing `url` param!');
  }

  reportDebug(reporter, options, 'Source taxons');
  reportDebug(reporter, options, '------------');

  return Promise.resolve()
    .then(() => getAllTaxons(url, locales))
    .then((localizedTaxons:Array<LocalizedCollection<SyliusTaxon>>) => {
      if (!localizedTaxons.length) {
        report(reporter, 'No taxons has been found!', 'warn');

        return Promise.resolve();
      }

      const taxonsPromises: Array<Promise<void>> = [];

      localizedTaxons.forEach(({ collection: taxons, locale }) => {
        reportDebug(reporter, options, `Source taxons - ${locale} (${taxons.length})`);

        return Promise.resolve()
          .then(() => getTaxonNodes(
            taxons,
            locale,
            {
              cache,
              createContentDigest,
              createNode,
              createNodeId,
              getCache,
              reporter,
              store,
            },
          ))
          .then((taxonNodes: TaxonNode[]) => {
            const taxonNodesPromises: Array<Promise<any>> = [];

            taxonNodes.forEach((node: TaxonNode) => {
              const imagesNodesPromises: Array<Promise<any>> = [];

              node.images.forEach((imageNode) => {
                imagesNodesPromises.push(
                  Promise.resolve()
                    .then(() => createNode(imageNode)),
                );
              });

              taxonNodesPromises.push(Promise.all(imagesNodesPromises));
            });

            return Promise.all(taxonNodesPromises)
              .then(() => createLinkedNodes(taxonNodes, createNode, createParentChildLink))
              .then(() => reportDebug(reporter, options, 'Locale taxons sourced'));
          });
      });

      return Promise.all(taxonsPromises)
        .then(() => {
          reportDebug(reporter, options, 'Taxons sourced');
          reportDebug(reporter, options, '------------');
        });
    });
}
