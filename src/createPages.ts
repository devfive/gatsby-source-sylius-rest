import { CreatePagesArgs, Page } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
import { getPagesDefinitions } from './pagesDefinitions/getPagesDefinitions';
import { BaseTaxonNode, BaseProductNode } from './schemas/Nodes';
import { PartialSyliusSourcePluginOptions, SyliusSourcePluginOptions } from './schemas/Plugin/Options';

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

  if (options.debug) {
    reporter.info('[Sylius Source] createPages');
  }

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
    return;
  }

  const {
    allSyliusProduct: { nodes: products },
    allSyliusTaxon: { nodes: taxons },
  } = data;


  const pagesDefinitions: Page[] = getPagesDefinitions(options.pages, {
    products,
    taxons,
  });

  pagesDefinitions.forEach((page: Page) => createPage(page));
}
