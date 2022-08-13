---
sidebar_position: 4
---
# Getting started with Jest

**In this section you will:**
- install Jest
- write your first test
- setup Jest config file
- learn how to enable Jest for Typescript projects

You can find official Jest documentation [here](https://jestjs.io/docs/getting-started).

## Install & run first test

Let's install Jest, create and run your first test.

**Step 1.** Install Jest

```js
// for npm
npm install --save-dev jest

// for yarn
yarn add --dev jest
```

**Step 2.** Create a simple function that will calculate sum of two numbers

```js title="sum.js"
const sum = (a, b) => a + b;

module.exports = sum;
```

**Step 3.** Create your first test (pay attention to file name)

```js title="sum.test.js"
const sum = require('./sum');

test('adds 5 + 2 to equal 7', () => {
  expect(sum(5, 2)).toBe(7);
});
```

**Step 4.** Add `jest` command to `package.json` to run your tests

```js
{
  "scripts": {
    "test": "jest"
  }
}
```

**Step 5.** Run test using command `npm test` or `yarn test`

```js
❯ yarn test
yarn run v1.22.10
$ jest
PASS sum.test.js
  ✓ adds 5 + 2 to equal 7 (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.498 s
Ran all test suites.
✨  Done in 2.19s.
```

## Jest configuration

You can define extra configuration for your Jest tests in `package.json`, `jest.config.js`, `jest.config.js` or through the `--config <path/to/file.js|ts|cjs|mjs|json>` CLI option for `jest` command.

List of options supported to be configured can be found [here](https://jestjs.io/docs/configuration#options).

Some of the most commonly used options:
- `testEnvironment` - environment to be used for testing
- `roots` - a folder where Jest will search tests
- `setupFiles` - files that will be executed before running tests
- `testMatch` - regex for your tests file names

**Example of config file:**
```js title="jest.config.js"
module.exports = {
  testEnvironment: 'node',
  roots: ['./src'],
  setupFiles: ['<rootDir>/loadTestEnv.ts'],
  testMatch: ['**/?(*.)unit.test.ts'],
};
```

## Typescript support

If you have a project written in Typescript, you will need to do some extra setup for Jest. You will need to install TypeScript preprocessor [ts-jest](https://www.npmjs.com/package/ts-jest) and type definitions for tests [@types/jest](https://www.npmjs.com/package/@types/jest).

```js
// for npm
npm install --save-dev ts-jest @types/jest

// for yarn
yarn add --dev ts-jest @types/jest
```

Once package is installed, add `ts-jest` as `preset` in your Jest config file:
```js title="jest.config.js"
module.exports = {
  preset: 'ts-jest',
};
```