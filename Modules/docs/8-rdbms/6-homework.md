# Practical task

In this task you will be needed to modify your previous Express application, move data storage from in-memory to database
and follow Three Layered architecture.

Acceptance criteria:
- All data is stored in a Database.
- Docker image of postgres is used for local development
- Migrations are used to create and maintain database structure.
- For authentication users you query parameters or headers with user email/id is used.
- Order entity has **copy of products**. Use json column to store this data
- TypeScript is used
- Layered architecture is used

Additional (optional) tasks:
- Use Seeds to populate database with test data (i.e. users,products)
- If you are using MikroOrm use [type-safe relations](https://mikro-orm.io/docs/type-safe-relations) and collections 

### Evaluation criteria

- 2 - Data is moved to SQL database. No migrations and Docker.
- 3 - Data is moved to SQL database, migrations are added. Docker is not used.
- 4 - Implementation meets Acceptance criteria mentioned above. No additional tasks are done.
- 5 - Implementation meets Acceptance criteria mentioned above. Additional task for seeds is done.