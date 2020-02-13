import { getPackageName } from '../getPackageName';

describe('getPackageName', () => {
  it('should return this package name', () => {
    // when
    // then
    expect(getPackageName()).toEqual('gatsby-source-sylius-rest');
  });
});
