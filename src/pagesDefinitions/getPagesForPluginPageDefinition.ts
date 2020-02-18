import { Page } from 'gatsby';
import { BaseProductNode, BaseTaxonNode } from '../schemas/Nodes';
import {
  SyliusSourcePluginPageDefinition,
  SyliusSourcePluginPagesType,
} from '../schemas/Plugin';
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
