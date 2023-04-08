---
sidebar_position: 98
---

# Practical task

In this task you will be needed to modify your previous Express application, extend user model and add authorization and authentication flow

Acceptance criteria:
- All data is stored in a Database.
- Docker image of PostgreSQL is used for local development
- User entity is extended with email and password properties
- Migrations are used to create and maintain database structure
- User can be registered using api with email (unique) and password
- User can be logged using api with email and password
- For authentication users you use jwt token received from login endpoint
- TypeScript is used
- Layered architecture is used

### Evaluation criteria

- 3 - Authorization and authentication are missing. User entity is extended with email and password properties.
- 4 - Authorization is missing, authentication is implemented.
- 5 - Implementation meets Acceptance criteria mentioned above.