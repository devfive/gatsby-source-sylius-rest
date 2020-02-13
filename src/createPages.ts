import { CreatePagesArgs, Page } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
import { getPagesDefinitions } from './pagesDefinitions/getPagesDefinitions';
import { BaseTaxonNode } from './schemas/Nodes/Taxon';
import { PartialSyliusSourcePluginOptions, SyliusSourcePluginOptions } from './schemas/Plugin/Options';

interface GraphQLQueryResult<T> {
  errors?: any;
  data?: T;
}

interface TaxonsQueryResult {
  allSyliusTaxon: {
    nodes: BaseTaxonNode[],
  };
}

export async function createPages(
  {
    actions,
    graphql,
    reporter,
  }: CreatePagesArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
): Promise<void> {
  const { createPage } = actions;
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);

  if (options.debug) {
    reporter.info('[Sylius Source] createPages');
  }

  const { data }: GraphQLQueryResult<TaxonsQueryResult> = await graphql<TaxonsQueryResult>(`
    query {
      allSyliusTaxon {
        nodes {
          slug
          name
          id
          locale
          position
          description
          code
        }
      }
    }
  `);

  if (!data) {
    return;
  }

  const { allSyliusTaxon: { nodes: taxons } } = data;


  const pagesDefinitions: Page[] = getPagesDefinitions(options.pages, {
    taxons,
  });

  pagesDefinitions.forEach((page: Page) => createPage(page));
}
