import { Page } from 'gatsby';
import * as UrlPattern from 'url-pattern';
import { SyliusSourcePluginPageDefinition } from '../../schemas/Plugin/Options';
import { BaseProductNode } from '../../schemas/Nodes/Product';
import { getPathPattern } from '../utils/getPathPattern';

const DEFAULT_PATH_PATTERN: string = '/:locale/:slug';

export function getProductsPagesDefinitions(
  pluginPage: SyliusSourcePluginPageDefinition,
  products: BaseProductNode[],
): Page[] {
  return products.map((product: BaseProductNode) => {
    const path: string = getPathPattern(pluginPage.path, product.locale, DEFAULT_PATH_PATTERN);
    const pattern: UrlPattern = new UrlPattern(path);

    return {
      path: pattern.stringify(product),
      component: pluginPage.component,
      context: {
        code: product.code,
        product,
      },
    };
  });
}
