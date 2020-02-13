import { Page } from 'gatsby';
import { SyliusSourcePluginPageDefinition } from '../../schemas/Plugin/Options';
import { BaseTaxonNode } from '../../schemas/Nodes/Taxon';

export function getTaxonPagesDefinitions(
  pluginPage: SyliusSourcePluginPageDefinition,
  taxons: BaseTaxonNode[],
): Page[] {
  return taxons.map((taxon: BaseTaxonNode) => ({
    path: `/pl/${taxon.slug}`,
    component: pluginPage.component,
    context: {
      slug: taxon.slug,
    },
  }));
}
