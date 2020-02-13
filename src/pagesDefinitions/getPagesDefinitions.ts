import { Page } from 'gatsby';
import { BaseProductNode } from '../schemas/Nodes/Product';
import { BaseTaxonNode } from '../schemas/Nodes/Taxon';
import { SyliusSourcePluginPageDefinition } from '../schemas/Plugin/Options';
import { getPagesForPluginPageDefinition } from './getPagesForPluginPageDefinition';

export function getPagesDefinitions(
  pluginPages: SyliusSourcePluginPageDefinition[],
  data: {
    products: BaseProductNode[],
    taxons: BaseTaxonNode[],
  },
): Page[] {
  return pluginPages.reduce((allPages: Page[], pluginPage: SyliusSourcePluginPageDefinition) => {
    const pages: Page[] = getPagesForPluginPageDefinition(pluginPage, data);

    return [
      ...allPages,
      ...pages,
    ];
  }, []);
}
