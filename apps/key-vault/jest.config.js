module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  testPathIgnorePatterns: ['<rootDir>/tests/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/main.ts',
  ],
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/../../libs/$1/src',
    '^@key-vault/prisma-client$': '<rootDir>/../../packages/key-vault-prisma-client/src',
  },
};
