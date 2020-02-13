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
});
