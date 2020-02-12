import { SyliusTaxon } from '../../schemas/Sylius/Taxon';
import { TaxonNode } from '../../schemas/Nodes/Taxon';
import { getTaxonNodes } from '../getTaxonNodes';

describe('getTaxonNodes', () => {
  let taxons: SyliusTaxon[];
  let nodes: TaxonNode[];

  describe('when flat list of taxons is provided', () => {
    beforeEach(() => {
      // having
      taxons = [
        getTaxon('taxon-1', 'Taxon 1', 'taxon-1-slug', 0),
        getTaxon('taxon-2', 'Taxon 2', 'taxon-2-slug', 1),
        getTaxon('taxon-3', 'Taxon 3', 'taxon-3-slug', 2),
      ];

      // when
      nodes = getTaxonNodes(taxons, createNodeId, createContentDigest);
    });

    it('should have correct length', () => {
      // then
      expect(nodes.length).toEqual(3);
    });

    it('should return valid array of TaxonNode', () => {
      // then
      expect(nodes).toEqual([
        {
          code: 'taxon-1',
          description: '',
          name: 'Taxon 1',
          position: 0,
          slug: 'taxon-1-slug',
          parent: undefined,
          children: [],
          id: 'id-taxon-taxon-1',
          internal: {
            type: 'SyliusTaxon',
            content: JSON.stringify(taxons[0]),
            contentDigest: `content-${JSON.stringify(taxons[0])}`,
          },
        },
        {
          code: 'taxon-2',
          description: '',
          name: 'Taxon 2',
          position: 1,
          slug: 'taxon-2-slug',
          parent: undefined,
          children: [],
          id: 'id-taxon-taxon-2',
          internal: {
            type: 'SyliusTaxon',
            content: JSON.stringify(taxons[1]),
            contentDigest: `content-${JSON.stringify(taxons[1])}`,
          },
        },
        {
          code: 'taxon-3',
          description: '',
          name: 'Taxon 3',
          position: 2,
          slug: 'taxon-3-slug',
          parent: undefined,
          children: [],
          id: 'id-taxon-taxon-3',
          internal: {
            type: 'SyliusTaxon',
            content: JSON.stringify(taxons[2]),
            contentDigest: `content-${JSON.stringify(taxons[2])}`,
          },
        },
      ]);
    });
  });

  describe('when taxons with children are provided', () => {
    beforeEach(() => {
      // having
      taxons = [
        getTaxon('taxon-1', 'Taxon 1', 'taxon-1-slug', 0, [
          getTaxon('taxon-1-1', 'Taxon 1-1', 'taxon-1-1-slug', 0, [
            getTaxon('taxon-1-1-1', 'Taxon 1-1-1', 'taxon-1-1-1-slug', 0),
            getTaxon('taxon-1-1-2', 'Taxon 1-1-2', 'taxon-1-1-2-slug', 1),
          ]),
          getTaxon('taxon-1-2', 'Taxon 1-2', 'taxon-1-2-slug', 0),
        ]),
      ];

      // when
      nodes = getTaxonNodes(taxons, createNodeId, createContentDigest);
    });

    it('should have correct length', () => {
      // then
      expect(nodes.length).toEqual(5);
    });

    it('should return valid array of TaxonNode', () => {
      // then
      expect(nodes).toEqual([
        {
          code: 'taxon-1',
          description: '',
          name: 'Taxon 1',
          position: 0,
          slug: 'taxon-1-slug',
          parent: undefined,
          children: [
            'id-taxon-taxon-1-1',
            'id-taxon-taxon-1-2',
          ],
          id: 'id-taxon-taxon-1',
          internal: {
            type: 'SyliusTaxon',
            content: JSON.stringify(taxons[0]),
            contentDigest: `content-${JSON.stringify(taxons[0])}`,
          },
        },
        {
          code: 'taxon-1-1',
          description: '',
          name: 'Taxon 1-1',
          position: 0,
          slug: 'taxon-1-1-slug',
          parent: 'id-taxon-taxon-1',
          children: [
            'id-taxon-taxon-1-1-1',
            'id-taxon-taxon-1-1-2',
          ],
          id: 'id-taxon-taxon-1-1',
          internal: {
            type: 'SyliusTaxon',
            content: JSON.stringify(taxons[0].children[0]),
            contentDigest: `content-${JSON.stringify(taxons[0].children[0])}`,
          },
        },
        {
          code: 'taxon-1-1-1',
          description: '',
          name: 'Taxon 1-1-1',
          position: 0,
          slug: 'taxon-1-1-1-slug',
          parent: 'id-taxon-taxon-1-1',
          children: [],
          id: 'id-taxon-taxon-1-1-1',
          internal: {
            type: 'SyliusTaxon',
            content: JSON.stringify(taxons[0].children[0].children[0]),
            contentDigest: `content-${JSON.stringify(taxons[0].children[0].children[0])}`,
          },
        },
        {
          code: 'taxon-1-1-2',
          description: '',
          name: 'Taxon 1-1-2',
          position: 1,
          slug: 'taxon-1-1-2-slug',
          parent: 'id-taxon-taxon-1-1',
          children: [],
          id: 'id-taxon-taxon-1-1-2',
          internal: {
            type: 'SyliusTaxon',
            content: JSON.stringify(taxons[0].children[0].children[1]),
            contentDigest: `content-${JSON.stringify(taxons[0].children[0].children[1])}`,
          },
        },
        {
          code: 'taxon-1-2',
          description: '',
          name: 'Taxon 1-2',
          position: 0,
          slug: 'taxon-1-2-slug',
          parent: 'id-taxon-taxon-1',
          children: [],
          id: 'id-taxon-taxon-1-2',
          internal: {
            type: 'SyliusTaxon',
            content: JSON.stringify(taxons[0].children[1]),
            contentDigest: `content-${JSON.stringify(taxons[0].children[1])}`,
          },
        },
      ]);
    });
  });
});

function getTaxon(
  code: string,
  name: string,
  slug: string,
  position: number = 0,
  children: SyliusTaxon[] = [],
  description: string = '',
  images: [] = [],
): SyliusTaxon {
  return {
    children,
    code,
    description,
    images,
    name,
    position,
    slug,
  };
}

function createNodeId(id: string): string {
  return `id-${id}`;
}

function createContentDigest(content: string): string {
  return `content-${content}`;
}
