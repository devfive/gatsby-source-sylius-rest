import { Page } from 'gatsby';
import * as UrlPattern from 'url-pattern';
import { SyliusSourcePluginPageDefinition } from '../../schemas/Plugin/Options';
import { BaseProductNode } from '../../schemas/Nodes/Product';

const DEFAULT_PATH_PATTERN: string = '/:locale/:slug';

export function getProductsPagesDefinitions(
  pluginPage: SyliusSourcePluginPageDefinition,
  pages: BaseProductNode[],
): Page[] {
  const path: string = pluginPage.path || DEFAULT_PATH_PATTERN;
  const pattern: UrlPattern = new UrlPattern(path);

  return pages.map((page: BaseProductNode) => {
    return {
      path: pattern.stringify(page),
      component: pluginPage.component,
      context: {
        page,
      },
    };
  });
}
