import { NodeInput } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';
import { ImageNode } from '../../schemas/Nodes/Image';
import { isImageNode } from '../isImageNode';

describe('isImageNode', () => {
  describe('when ImageNode is provided', () => {
    it('should return true', () => {
      // having
      const node: ImageNode = {
        cachedPath: 'some_cached_path.jpg',
        file: {} as FileSystemNode,
        id: 'id',
        internal: {
          type: 'SyliusImage',
          contentDigest: '',
        },
        path: 'some_path.jpg',
      };

      // when
      // then
      expect(isImageNode(node)).toEqual(true);
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
      expect(isImageNode(node)).toEqual(false);
    });
  });
});
