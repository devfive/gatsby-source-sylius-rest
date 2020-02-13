import { Page } from 'gatsby';
import { BaseTaxonNode } from '../schemas/Nodes/Taxon';
import { SyliusSourcePluginPageDefinition, SyliusSourcePluginPagesType } from '../schemas/Plugin/Options';
import { getTaxonPagesDefinitions } from './taxons/getTaxonPagesDefinitions';

export function getPagesForPluginPageDefinition(
  pluginPage: SyliusSourcePluginPageDefinition,
  data: { taxons: BaseTaxonNode[] },
): Page[] {
  switch (pluginPage.type) {
    case SyliusSourcePluginPagesType.TAXON: {
      return getTaxonPagesDefinitions(pluginPage, data.taxons);
    }

    default: {
      return [];
    }
  }
}
