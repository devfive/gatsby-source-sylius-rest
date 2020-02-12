import { TaxonNode } from '../schemas/Nodes/Taxon';
import { SyliusTaxon } from '../schemas/Sylius/Taxon';

export function getTaxonNodes(
  taxons: SyliusTaxon[],
  createNodeId: Function,
  createContentDigest: (input: any) => string,
): TaxonNode[] {
  return taxons.map((taxon: SyliusTaxon) => {
    const content: string = JSON.stringify(taxon);

    return {
      code: taxon.code,
      name: taxon.name,
      slug: taxon.slug,
      position: taxon.position,
      description: taxon.description,
      parent: undefined,
      children: [],
      id: createNodeId(`taxon-${taxon.code}`),
      internal: {
        type: 'SyliusTaxon',
        content,
        contentDigest: createContentDigest(content),
      },
    };
  });
}
