import { CreatePagesArgs, Page } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
import { getPagesDefinitions } from './pagesDefinitions/getPagesDefinitions';
import { BaseTaxonNode, BaseProductNode } from './schemas/Nodes';
import { PartialSyliusSourcePluginOptions, SyliusSourcePluginOptions } from './schemas/Plugin/Options';
import { reportDebug } from './utils/reportDebug';

interface GraphQLQueryResult<T> {
  errors?: any;
  data?: T;
}

interface QueryResult {
  allSyliusTaxon: {
    nodes: BaseTaxonNode[],
  };
  allSyliusProduct: {
    nodes: BaseProductNode[],
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

  reportDebug(reporter, options, 'createPages - init');

  const { data }: GraphQLQueryResult<QueryResult> = await graphql<QueryResult>(`
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
      allSyliusProduct {
        nodes {
          id
          description
          code
          channelCode
          averageRating
          metaDescription
          metaKeywords
          name
          shortDescription
          slug
          locale
          taxons {
            main
            others
          }
          variants {
            axis
            code
            nameAxis
            originalPrice {
              currency
              current
            }
            price {
              currency
              current
            }
          }
        }
      }
    }
  `);

  if (!data) {
    reportDebug(reporter, options, 'createPages - no data, pages are not created');

    return;
  }

  const {
    allSyliusProduct: { nodes: products },
    allSyliusTaxon: { nodes: taxons },
  } = data;

  reportDebug(reporter, options, 'createPages - get pages definitions');
  reportDebug(reporter, options, `createPages - ${products.length} products`);
  reportDebug(reporter, options, `createPages - ${taxons.length} taxons`);

  const pagesDefinitions: Page[] = getPagesDefinitions(options.pages, {
    products,
    taxons,
  });

  pagesDefinitions.forEach((page: Page) => createPage(page));
}
