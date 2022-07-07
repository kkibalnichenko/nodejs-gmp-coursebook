const packageName = require("./package.json").name.split("@name/").pop();

module.exports = {
  preset: "ts-jest",
  displayName: `bnc-ppr`,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: "node",
  testRegex: "/tests/.*\\.(test|spec)\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.js", "!src/migrations/**"],
  coverageDirectory: "dist/reports/",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
