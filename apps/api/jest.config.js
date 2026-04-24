module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/common$': '<rootDir>/../../libs/common/src',
    '^@app/auth-utilities$': '<rootDir>/../../libs/auth-utilities/src',
    '^@app/app-logger$': '<rootDir>/../../libs/app-logger/src',
    '^@app/health$': '<rootDir>/../../libs/health/src',
    '^@app/caching$': '<rootDir>/../../libs/caching/src',
  },
};
