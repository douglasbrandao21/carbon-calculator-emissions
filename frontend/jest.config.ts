import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.module\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(css|scss)$': '<rootDir>/test/styleMock.js',
  }
};

export default config;
