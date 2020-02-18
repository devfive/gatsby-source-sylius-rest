import { Page } from 'gatsby';
import * as UrlPattern from 'url-pattern';
import { BaseTaxonNode } from '../../schemas/Nodes';
import { SyliusSourcePluginPageDefinition } from '../../schemas/Plugin';
import { getPathPattern } from '../utils/getPathPattern';

const DEFAULT_PATH_PATTERN: string = '/:locale/:slug';

export function getTaxonPagesDefinitions(
  pluginPage: SyliusSourcePluginPageDefinition,
  taxons: BaseTaxonNode[],
): Page[] {
  return taxons.map((taxon: BaseTaxonNode) => {
    const path: string = getPathPattern(pluginPage.path, taxon.locale, DEFAULT_PATH_PATTERN);
    const pattern: UrlPattern = new UrlPattern(path);

    return {
      path: pattern.stringify(taxon),
      component: pluginPage.component,
      context: {
        code: taxon.code,
        taxon,
      },
    };
  });
}
