/**
 * @file Jest configuration.
 */
module.exports = {
  rootDir: './test',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  // testRegex: '/src/test/.*test\\.js$',
  setupFiles: ['<rootDir>/setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts}'],
  coveragePathIgnorePatterns: [
    '/node_modules',
    'coverage',
    '.vscode',
    '/ui-client',
    'index.local.js',
    'gulpfile.js',
    'webpack.config.js',
    'wallaby.js',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: -10,
    },
  },
};
