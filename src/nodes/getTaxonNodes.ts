import { Reporter } from 'gatsby';
import { flatten } from 'lodash';
import { TaxonNode, ImageNode } from '../schemas/Nodes';
import { SyliusTaxon } from '../schemas/Sylius';
import { getImageNodes } from './getImageNodes';

type CreateNodeIdFunction = Function;
type CreateContentDigestFunction = (input: any) => string;

interface GetTaxonNodesOptions {
  cache: any;
  createContentDigest: CreateContentDigestFunction;
  createNode: any;
  createNodeId: CreateNodeIdFunction;
  getCache: any;
  store: any;
  reporter: Reporter;
}

export async function getTaxonNodes(
  taxons: SyliusTaxon[],
  locale: string,
  options: GetTaxonNodesOptions,
  parent?: string,
): Promise<Array<TaxonNode>> {
  const taxonsPromises: Array<Promise<Array<TaxonNode>>> = taxons
    .map((taxon: SyliusTaxon) => getFlattenedTaxonNode(
      taxon,
      locale,
      options,
      parent,
    ));

  return Promise.all(taxonsPromises)
    .then((taxonsArrays: Array<Array<TaxonNode>>) => flatten(taxonsArrays));
}

async function getFlattenedTaxonNode(
  taxon: SyliusTaxon,
  locale: string,
  options: GetTaxonNodesOptions,
  parent?: string,
): Promise<Array<TaxonNode>> {
  const { createContentDigest, createNodeId } = options;
  const content: string = JSON.stringify(taxon);
  const id: string = createNodeId(`taxon-${locale}-${taxon.code}`);
  const childNodes: TaxonNode[] = await getTaxonNodes(
    taxon.children,
    locale,
    options,
    id,
  );
  const images: ImageNode[] = await getImageNodes(
    taxon.images,
    options,
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
      images,
      internal: {
        type: 'SyliusTaxon',
        content,
        contentDigest: createContentDigest(content),
      },
      locale,
      name: taxon.name,
      parent,
      position: taxon.position,
      slug: taxon.slug,
    },
    ...childNodes,
  ];
}
