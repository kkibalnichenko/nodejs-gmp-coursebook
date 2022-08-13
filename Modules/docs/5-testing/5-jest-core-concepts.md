---
sidebar_position: 5
---
# Jest core concepts

## Introduction

In the previous section you implemented your first Jest test. Let's review some core Jest concepts before we actually start writing unit / integration / e2e tests.

**In this section you will learn:**
- Jest test lifecycle
- how to mock functions and set spies on them
- how to test async code and function that throw errors

## Grouping tests

In the previous section you learnt that tests can be defined with function `test()`. It is not the only way to do it. You can also use `it()` that will produce the same output.

```js
// example with test()
test('adds 5 + 2 to equal 7', () => {
  expect(sum(5, 2)).toBe(7);
});

// example with it()
it('adds 5 + 2 to equal 7', () => {
  expect(sum(5, 2)).toBe(7);
});
```

Several tests can be grouped using `describe()`. It is a good practice keep ypu tests small, but group them under the same describe. In the example below we have separate test cases for success and error test suites.

```js
describe('Create user', () => {
  // test for success
  it('should create valid user object', () => { ... })
  // test for error
  it('should throw error if username & password are not provided', () => { ... })
})
```

## Test lifecycle

There are use cases when you need to do some setup jobs before the actual tests or do some cleanup when they finish execution. Jest provides several global methods that can be executed before or after tests:
- `beforeAll()` - runs before all tests
- `afterAll()` - runs after all tests
- `beforeEach()` - runs before each test
- `afterEach()` - runs after each test

## Mocks

Let's imagine a situation when you want to write some tests for `function A` that calls another `function B`. In this specific case you want to concentrate on testing the behavior of `function A`. `function B` is quite slow because it makes request to another API. So instead of calling it, you just want to "hardcode" the returned value.

**Mocks** allow you to replace the actual implementation of a function. You can track if mock function was called, how many times and with what arguments.
### jest.mock()

The most basic strategy for mocking is to reassign a function to the mock function. Then, anywhere the reassigned functions are used, the mock will be called instead of the original function:

**Example: Mock custom module**

```js
// session.ts
const generateSession = () => {
  // ...
  return { accessToken, refreshToken }
}

export default generateSession;

// login.ts
import generateSession from './session.ts'

const login = () => {
  // ...
  const session = generateSession();
  // ...
}

export default login;

// login.test.ts

// reassign function to mocked function
jest.mock('./session.ts', () => {
  return jest.fn(() => {
    // generateSession() won't be called. we mock returned value instead.
    return { accessToken: '123', refreshToken: '567' };
  });
});

describe(...)
```

### jest.spyOn()

Sometimes you only want to watch a method be called, but keep the original implementation. Or e.g you may want to mock the implementation, but restore the original later in the suite.

**Example: Set spy on function**

```js
// secretsManager.ts

const secretsManager = {
  getSecret: (secretName) => {},
  storeSecret: (secretName, secretValue) => {}
}

export default secretsManager;

// password-generator.ts
import secretsManager from './secretsManager';

const generatePassword = {
  const secret = secretsManager.getSecret('PASSWORD_SECRET');
  // ...
}

export default generatePassword;

// password-generator.test.ts
import secretsManager from './secretsManager';
import generatePassword from '../generatePassword'

describe('Generate password', () => {
  test('should generate valid password', () => {
    // mock returned value with spies
    const getSecretsSpy = jest
      .spyOn(secretsManager, 'getSecret')
      .mockImplementation(() => {
        return Promise.resolve({ PASSWORD_SECRET: '12345' });
      });

    generatePassword();

    // check how many times function was called
    expect(getSecretsSpy).toBeCalledTimes(1);
    // check if spy was called with proper arguments
    expect(getSecretsSpy).toHaveBeenCalledWith('PASSWORD_SECRET');
  })
})
```

Check [Jest docs](https://jestjs.io/docs/mock-functions) for more examples.

## Common use cases
### Testing async code

```js
// users.ts

const getUsersCount = async () = {
  const users = await db.getUsersCount();
  return users;
}

// users.test.ts
test('get users', async () => {
  const count = await getUsersCount();
  expect(count).toBe(20);
})

```
### Testing errors

```js
// users.ts
const createUser = async (username, age) => {
  if (age < 18) {
    throw new Error('Age should be greater than 18')
  }
  // ... create user
}

// users.test.ts
test('create user', async () => {
   await expect(createUser(16)).rejects.toThrow('Age should be greater than 18');
})
```

## Useful links

- [Jest Mock functions](https://jestjs.io/docs/mock-functions)
- [Understanding Jest mocks](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c)