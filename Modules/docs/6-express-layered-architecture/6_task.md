---
sidebar_position: 5
---

# Practical task

In this task you will be needed to create an Express application and follow Three Layered architecture.

**Acceptance criteria:**
- All data is stored either in memory or on file system.
- [swagger.yaml](https://gitbud.epam.com/diana_baburina/ngmp-public/-/blob/main/express-layered-architecture/swagger.yaml) file is used for getting information about endpoints that should be implemented.
- For authentication users you query parameters or headers with user email is used.
- Order entity has **copy of products**. _If you have only product id in order, it may lead to inconsistency. For
  example, if user creates an order and after that price is changed, the order price shouldn't be changed_
- TypeScript is used
- Layered architecture is used

**Additional (optional) tasks:**
- Every Cart has `userId` filed, but it's not be returned to frontend
- For `DELETE` `/api/profile/cart` soft-delete approach is be used. _Make sure that client of your API will not know that soft-delete approach is used_

### Evaluation criteria

- 1 - 2/6 endpoints are implemented (any). Some Acceptance criteria is skipped.
- 2 - 4/6 endpoints are implemented (any). Some Acceptance criteria is skipped.
- 3 - All endpoints are implemented. Some Acceptance criteria is skipped.
- 4 - Implementation meets Acceptance criteria mentioned above.
- 5 - Implementation meets Acceptance criteria mentioned above. One or both additional tasks are implemented.
