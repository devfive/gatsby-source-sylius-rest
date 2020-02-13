import { Page } from 'gatsby';
import { BaseProductNode } from '../schemas/Nodes/Product';
import { BaseTaxonNode } from '../schemas/Nodes/Taxon';
import { SyliusSourcePluginPageDefinition, SyliusSourcePluginPagesType } from '../schemas/Plugin/Options';
import { getProductsPagesDefinitions } from './products/getProductsPagesDefinitions';
import { getTaxonPagesDefinitions } from './taxons/getTaxonPagesDefinitions';

export function getPagesForPluginPageDefinition(
  pluginPage: SyliusSourcePluginPageDefinition,
  data: {
    products: BaseProductNode[],
    taxons: BaseTaxonNode[],
  },
): Page[] {
  switch (pluginPage.type) {
    case SyliusSourcePluginPagesType.TAXON: {
      return getTaxonPagesDefinitions(pluginPage, data.taxons);
    }

    case SyliusSourcePluginPagesType.PRODUCT: {
      return getProductsPagesDefinitions(pluginPage, data.products);
    }

    default: {
      return [];
    }
  }
}
