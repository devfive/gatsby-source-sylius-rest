import { SyliusSourcePluginPageLocalizedPathMap } from '../../../schemas/Plugin/Options';
import { getPathPattern } from '../getPathPattern';

describe('getPathPattern', () => {
  describe('when path is undefined', () => {
    it('should return default path', () => {
      // having
      const locale: string = 'pl';
      const defaultPattern: string = 'default';

      // when
      const resolvedPath: string = getPathPattern(undefined, locale, defaultPattern);

      // then
      expect(resolvedPath).toEqual(defaultPattern);
    });
  });

  describe('when string path is provided', () => {
    it('should return it', () => {
      // having
      const path: string = 'some-path';
      const locale: string = 'pl';
      const defaultPattern: string = 'default';

      // when
      const resolvedPath: string = getPathPattern(path, locale, defaultPattern);

      // then
      expect(resolvedPath).toEqual(path);
    });
  });

  describe('when object with paths is provided', () => {
    const path: SyliusSourcePluginPageLocalizedPathMap = {
      pl: 'pl-path',
    };
    const defaultPattern: string = 'default';

    describe('and path is defined for given locale', () => {
      it('should return it', () => {
        // having
        const locale: string = 'pl';

        // when
        const resolvedPath: string = getPathPattern(path, locale, defaultPattern);

        // then
        expect(resolvedPath).toEqual('pl-path');
      });
    });

    describe('and path is not defined for given locale', () => {
      it('should return default path', () => {
        // having
        const locale: string = 'en';

        // when
        const resolvedPath: string = getPathPattern(path, locale, defaultPattern);

        // then
        expect(resolvedPath).toEqual('default');
      });
    });
  });
});
