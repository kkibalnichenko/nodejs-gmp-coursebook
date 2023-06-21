---
sidebar_position: 6
---

# Practical task

### Requirements

Imagine a scenario where we traveled back in time to the early days when Node.js was first released, before any frameworks were introduced.

We have been asked to develop a REST API for users and their hobbies. The API should have the following functionality:
1. Create/delete user.
2. Partially update user properties.
3. Retrieve user by id, list of users. Returns only user data, no hobbies are returned.
4. Add/delete hobby for a specific user.
5. Get a list of user hobbies.

### Data model

Data can be stored in memory as an array. Check the structure of User below:

```js
const users = [
  {
    id: 1,
    name: 'Ann',
    email: 'ann@google.com',
    hobbies: ['books', 'sport', 'dancing'],
  },
  {
    id: 2,
    name: 'Ben',
    email: 'ben@google.com',
    hobbies: ['series', 'sport'],
  },
];
```

### Task

**Acceptance criteria:**
1. No frameworks are used. Server is created using [http](https://nodejs.org/api/http.html) module.
2. API is designed based on REST API principles. Constraints are not violated.
3. The functionality mentioned above is implemented. Proper status codes are used for responses (not only 200, but also e.g 201, 404). Input validation and authentication can be skipped.

**Additional (optional tasks):**
1. Caching headers are added (hint: hobbies do not change so often).
2. Hypermedia links (HATEOAS) are included (for each user to retrieve a list of hobbies).

### Evaluation criteria

- 3 - All endpoints are implemented. Some Acceptance criteria are skipped.
- 4 - Implementation meets Acceptance criteria mentioned above.
- 5 - Implementation meets Acceptance criteria mentioned above. One or both additional tasks are implemented.