/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  verbose: true,
  testMatch: [
    '<rootDir>/src/**/**.test.[j|t]sx',
  ],
  moduleFileExtensions: [
    'js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    //
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  collectCoverage: false,
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/config/CSSStub.js',
  },
  setupFiles: [
    '<rootDir>/public/env-config.js',
    '<rootDir>/src/mocks/intersectionObserverMock.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts',
  ],
};
