module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!node_modules/**',
    '!dist/**',
    '!**/*.d.ts',
  ],
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/libs/$1/src',
    '^@api/prisma-client$': '<rootDir>/packages/api-prisma-client/src',
    '^@auth/prisma-client$': '<rootDir>/packages/auth-prisma-client/src',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
