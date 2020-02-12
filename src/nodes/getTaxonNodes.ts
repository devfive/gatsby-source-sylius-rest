import { TaxonNode } from '../schemas/Nodes/Taxon';
import { SyliusTaxon } from '../schemas/Sylius/Taxon';

type CreateNodeIdFunction = Function;
type CreateContentDigestFunction = (input: any) => string;

export function getTaxonNodes(
  taxons: SyliusTaxon[],
  createNodeId: CreateNodeIdFunction,
  createContentDigest: CreateContentDigestFunction,
  parent?: string,
): TaxonNode[] {
  return taxons.reduce((nodes: TaxonNode[], taxon: SyliusTaxon) => {
    const flatNodes: TaxonNode[] = getFlattenedTaxonNode(taxon, createNodeId, createContentDigest, parent);

    return [
      ...nodes,
      ...flatNodes,
    ];
  }, []);
}

function getFlattenedTaxonNode(
  taxon: SyliusTaxon,
  createNodeId: CreateNodeIdFunction,
  createContentDigest: CreateContentDigestFunction,
  parent?: string,
): TaxonNode[] {
  const content: string = JSON.stringify(taxon);
  const id: string = createNodeId(`taxon-${taxon.code}`);
  const childNodes: TaxonNode[] = getTaxonNodes(taxon.children, createNodeId, createContentDigest, id);
  const children: string[] = childNodes
    .filter((node: TaxonNode) => node.parent === id)
    .map((node: TaxonNode) => node.id);

  return [
    {
      children,
      code: taxon.code,
      description: taxon.description,
      id,
      internal: {
        type: 'SyliusTaxon',
        content,
        contentDigest: createContentDigest(content),
      },
      name: taxon.name,
      parent,
      position: taxon.position,
      slug: taxon.slug,
    },
    ...childNodes,
  ];
}
