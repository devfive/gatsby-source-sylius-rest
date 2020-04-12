import { SyliusSourcePluginOptions, PartialSyliusSourcePluginOptions } from '../../schemas/Plugin/Options';
import { defaultOptions, getDefaultOptions } from '../getDefaultOptions';

describe('getDefaultOptions', () => {
  describe('when empty options object is provided', () => {
    it('should return object filled with default options', () => {
      // having
      const options: PartialSyliusSourcePluginOptions = {
        plugins: [],
      };

      // when
      const newOptions: SyliusSourcePluginOptions = getDefaultOptions(options);

      // then
      expect(newOptions).toEqual(defaultOptions);
    });
  });

  describe('when partial schemas are given', () => {
    it('should return other schemas as empty object', () => {
      // having
      const options: PartialSyliusSourcePluginOptions = {
        plugins: [],
        schemas: {
          image: {
            imageField: 'String!',
          },
          product: {
            productField: 'String!',
          },
          productPrice: {
            productPriceField: 'String!',
          },
        },
      };

      // when
      const newOptions: SyliusSourcePluginOptions = getDefaultOptions(options);

      // then
      expect(newOptions).toEqual({
        ...defaultOptions,
        schemas: {
          image: {
            imageField: 'String!',
          },
          product: {
            productField: 'String!',
          },
          productPrice: {
            productPriceField: 'String!',
          },
          productTaxons: {},
          productVariant: {},
          taxon: {},
        },
      });
    });
  });
});
