import { TaxonNode } from '../schemas/Nodes/Taxon';
import { SyliusTaxon } from '../schemas/Sylius/Taxon';

type CreateNodeIdFunction = Function;
type CreateContentDigestFunction = (input: any) => string;

export function getTaxonNodes(
  taxons: SyliusTaxon[],
  locale: string,
  createNodeId: CreateNodeIdFunction,
  createContentDigest: CreateContentDigestFunction,
  parent?: string,
): TaxonNode[] {
  return taxons.reduce((nodes: TaxonNode[], taxon: SyliusTaxon) => {
    const flatNodes: TaxonNode[] = getFlattenedTaxonNode(
      taxon,
      locale,
      createNodeId,
      createContentDigest,
      parent,
    );

    return [
      ...nodes,
      ...flatNodes,
    ];
  }, []);
}

function getFlattenedTaxonNode(
  taxon: SyliusTaxon,
  locale: string,
  createNodeId: CreateNodeIdFunction,
  createContentDigest: CreateContentDigestFunction,
  parent?: string,
): TaxonNode[] {
  const content: string = JSON.stringify(taxon);
  const id: string = createNodeId(`taxon-${locale}-${taxon.code}`);
  const childNodes: TaxonNode[] = getTaxonNodes(
    taxon.children,
    locale,
    createNodeId,
    createContentDigest,
    id,
  );
  const children: string[] = childNodes
    .filter((node: TaxonNode) => node.parent === id)
    .map((node: TaxonNode) => node.id);

  return [
    {
      children,
      code: taxon.code,
      description: taxon.description,
      id,
      locale,
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
