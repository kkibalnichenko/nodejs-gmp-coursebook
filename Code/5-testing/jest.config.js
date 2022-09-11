module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'],
  silent: false,
  verbose: true,
  collectCoverageFrom: ['src/**/*.{ts}'],
  coverageReporters: ['html', 'text', 'text-summary'],
};
