import { NodeInput } from 'gatsby';
import { ProductNode } from '../../schemas/Nodes';
import { isProductNode } from '../isProductNode';

describe('isProductNode', () => {
  describe('when ProductNode is provided', () => {
    it('should return true', () => {
      // having
      const node: ProductNode = {
        associations: [],
        channelCode: 'channel',
        code: 'code',
        id: 'id',
        images: [],
        internal: {
          type: 'SyliusProduct',
          contentDigest: '',
        },
        locale: 'pl',
        name: 'name',
        slug: 'slug',
        taxons: {
          main: 'taxon',
          others: [],
        },
        variants: [],
      };

      // when
      // then
      expect(isProductNode(node)).toEqual(true);
    });
  });

  describe('when another node is provided', () => {
    it('should return false', () => {
      // having
      const node: NodeInput = {
        id: 'id',
        internal: {
          type: 'SomeNode',
          contentDigest: '',
        },
      };

      // when
      // then
      expect(isProductNode(node)).toEqual(false);
    });
  });
});
