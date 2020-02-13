import { Page } from 'gatsby';
import * as UrlPattern from 'url-pattern';
import { SyliusSourcePluginPageDefinition } from '../../schemas/Plugin/Options';
import { BaseTaxonNode } from '../../schemas/Nodes/Taxon';

const DEFAULT_PATH_PATTERN: string = '/:locale/:slug';

export function getTaxonPagesDefinitions(
  pluginPage: SyliusSourcePluginPageDefinition,
  taxons: BaseTaxonNode[],
): Page[] {
  const path: string = pluginPage.path || DEFAULT_PATH_PATTERN;
  const pattern: UrlPattern = new UrlPattern(path);

  return taxons.map((taxon: BaseTaxonNode) => {
    return {
      path: pattern.stringify(taxon),
      component: pluginPage.component,
      context: {
        taxon,
      },
    };
  });
}
