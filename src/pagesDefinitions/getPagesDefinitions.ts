import { Page } from 'gatsby';
import { BaseProductNode, BaseTaxonNode } from '../schemas/Nodes';
import { SyliusSourcePluginPageDefinition } from '../schemas/Plugin';
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
