/**
 * @file Jest configuration.
 */
module.exports = {
  setupFiles: ["<rootDir>/test/setup.ts"],
  moduleFileExtensions: ["ts", "js", "jsx", "tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules",
    "coverage",
    ".vscode",
    "index.local.js",
    "gulpfile.js",
    "webpack.config.js",
    "wallaby.js",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  moduleDirectories: ["node_modules", "src"],
};
