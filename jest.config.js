module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['node_modules'],
};
