module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./",
  testRegex: "\\.test.tsx$",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["__tests__"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.config.setup.js"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
