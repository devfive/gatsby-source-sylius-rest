import { resolve } from 'path';
import { getPackageName } from '../getPackageName';

describe('getPackageName', () => {
  it('should return this package name', () => {
    // when
    // then
    expect(getPackageName()).toEqual('gatsby-source-sylius-rest');
  });

  describe('when path to package.json is provided', () => {
    describe('and it has name defined', () => {
      it('should return package name from it', () => {
        // having
        const path: string = resolve(__dirname, '../__fixtures__/package.json');

        // when
        // then
        expect(getPackageName(path)).toEqual('foo-package');
      });
    });

    describe('and it has not name defined', () => {
      it('should return default package name', () => {
        // having
        const path: string = resolve(__dirname, '../__fixtures__/packageWithoutName.json');

        // when
        // then
        expect(getPackageName(path)).toEqual('gatsby-source-sylius-rest');
      });
    });
  });

  describe('when corrupted package.json is provided', () => {
    it('should return default package name', () => {
      // having
      const path: string = resolve(__dirname, '../__fixtures__/corrupted.json');

      // when
      // then
      expect(getPackageName(path)).toEqual('gatsby-source-sylius-rest');
    });
  });
});
