import { CreatePagesArgs } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { BaseTaxonNode } from './schemas/Nodes/Taxon';

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
  options: SyliusSourcePluginOptions = defaultOptions,
): Promise<void> {
  const { createPage } = actions;

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
          position
          description
          code
        }
      }
    }
  `);

  console.log(data);
  if (data !== undefined) {
    const { allSyliusTaxon: { nodes: taxons } } = data;

    console.log(taxons);

    taxons.forEach((taxon: BaseTaxonNode) => {
      createPage({
        path: `/pl/${taxon.slug}`,
        component: options.components.taxonsPage,
        context: {
          slug: taxon.slug,
        },
      });
    });
  }
}
