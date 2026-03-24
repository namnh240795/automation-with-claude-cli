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
    '!tests/**',
  ],
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/../../libs/$1/src',
    '^@auth/prisma-client$': '<rootDir>/../../packages/auth-prisma-client/src',
    '^@api/prisma-client$': '<rootDir>/../../packages/api-prisma-client/src',
  },
};
