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
    createNodeId,
    createContentDigest,
    reporter,
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

      return Promise.all(taxonsPromises)
        .then(() => {
          reportDebug(reporter, options, 'Taxons sourced');
          reportDebug(reporter, options, '------------');
        });
    });
}
