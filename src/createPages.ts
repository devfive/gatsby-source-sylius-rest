import { CreatePagesArgs } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
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
          position
          description
          code
        }
      }
    }
  `);

  if (data !== undefined) {
    const { allSyliusTaxon: { nodes: taxons } } = data;

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
