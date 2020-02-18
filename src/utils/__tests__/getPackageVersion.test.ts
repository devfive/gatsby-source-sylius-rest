import { resolve } from 'path';
import { getPackageVersion } from '../getPackageVersion';

describe('getPackageVersion', () => {
  describe('when path to package.json is provided', () => {
    describe('and it has version defined', () => {
      it('should return package version from it', () => {
        // having
        const path: string = resolve(__dirname, '../__fixtures__/package.json');

        // when
        // then
        expect(getPackageVersion(path)).toEqual('1.0.1');
      });
    });

    describe('and it has not version defined', () => {
      it('should return undefined', () => {
        // having
        const path: string = resolve(__dirname, '../__fixtures__/packageWithoutVersion.json');

        // when
        // then
        expect(getPackageVersion(path)).toEqual(undefined);
      });
    });
  });

  describe('when corrupted package.json is provided', () => {
    it('should return undefined', () => {
      // having
      const path: string = resolve(__dirname, '../__fixtures__/corrupted.json');

      // when
      // then
      expect(getPackageVersion(path)).toEqual(undefined);
    });
  });
});
