import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MikroORM

## Overview

MikroORM is the TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns. It's one of
the best ORMs on the market, has rich amounts of features, quite mature and has clean documentation. It can be
integrated
with almost all popular frameworks easily, has first class TypeScript support, while staying back compatible with
Vanilla JavaScript.

### Entities

Entities are simple javascript objects (so called POJO) without restrictions and without the need to extend base
classes.
Using entity constructors works as well - they are never executed for managed entities (loaded from database).
Every entity is required to have a primary key.

Entities can be defined in two ways:

- Decorated classes - the attributes of the entity, as well as each property are provided via decorators.
  We use @Entity() decorator on the class. Entity properties are decorated either with @Property decorator, or with one
  of
  reference decorators: @ManyToOne, @OneToMany, @OneToOne and @ManyToMany. Check out
  the [full decorator reference](https://mikro-orm.io/docs/decorators).
- EntitySchema helper - With EntitySchema helper we define the schema programmatically. We can use regular classes as
  well
  as interfaces. This approach also allows to re-use partial entity definitions (e.g. traits/mixins). Read more about
  this
  in Defining Entities [via EntitySchema section](https://mikro-orm.io/docs/entity-schema).

Below you can see an example definition of a Book entity with author relation.

```ts
import {v4} from 'uuid';

@Entity()
export class Book {

    @PrimaryKey()
    uuid: string = v4();

    @Property()
    title!: string;

    @ManyToOne(() => Author)
    author!: Author;

}
```

There are lots of available decorators and features, like Optional Properties, Default values, Enums, formulas etc. You
can find
[whole set of features in docs](https://mikro-orm.io/docs/defining-entities)

### Identity map

MikroORM uses the Identity Map pattern to track objects. Whenever you fetch an object from the database, MikroORM will
keep a reference to this object inside its UnitOfWork. This allows MikroORM room for optimizations.
If you call the EntityManager and ask for an entity with a specific ID twice, it will return the same instance:

```ts
const authorRepository = orm.em.getRepository(Author);
const jon1 = await authorRepository.findOne(1);
const jon2 = await authorRepository.findOne(1);

// identity map in action
console.log(jon1 === jon2); // true
```

Only one SELECT query will be fired against the database here. In the second findOne() call MikroORM will check the
identity map
first and will skip the database round trip as it will find the entity already loaded.

The identity map being indexed by primary keys only allows shortcuts when you ask for objects by primary key. When you
query
by other properties, you will still get the same reference, but two separate database calls will be made:

```ts
const authorRepository = orm.em.getRepository(Author);
const jon1 = await authorRepository.findOne({name: 'Jon Snow'});
const jon2 = await authorRepository.findOne({name: 'Jon Snow'});

// identity map in action
console.log(jon1 === jon2); // true
```

Another important part that Identity map also tracks all changes in entities and creation of a new ones and responsible
for persisting changes into database.

There are 2 methods we should first describe to understand how persisting works in MikroORM: `em.persist()`
and `em.flush()`.

`em.persist(entity)` is used to mark new entities for future persisting. It will make the entity managed by given
EntityManager and once flush will be called, it will be written to the database.

To understand flush, lets first define what managed entity is: An entity is managed if it’s fetched from the database
(via `find()`, `findOne()` or via other managed entity) or registered as new through `persist()`.

`flush()` will go through all managed entities, compute appropriate change sets and perform according database queries.
As an entity loaded from database becomes managed automatically, we do not have to call persist on those,
and flush is enough to update them.

```ts
const jon = await authorRepository.findOne({name: 'Jon Snow'});
jon.name = 'Some Other Name';

// no need to persist `book` as its already managed by the EM
await authorRepository.flush(); // or em.flush(), this will actually trigger DB call
```

To save entity state to database, we need to persist it. Persist determines whether to use insert or update and computes
appropriate change-set. Entity references that are not persisted yet (does not have identifier) will be cascade
persisted automatically

```ts
const author = new Author('Jon Snow', 'snow@wall.st');
author.born = new Date();

const book1 = new Book('My Life on The Wall, part 1', author);

// just persist book, author will be automatically cascade persisted
await em.persistAndFlush([book1]); // or via repository.persistAndFlush()
```

### How MikroORM Detects Changes

MikroORM is a data-mapper that tries to achieve persistence-ignorance (PI). This means you map JS objects into a
relational
database that do not necessarily know about the database at all. A natural question would now be, "how does MikroORM
even detect objects have changed?".

For this MikroORM keeps a second map inside the UnitOfWork. Whenever you fetch an object from the database MikroORM will
keep a copy of all the properties and associations inside the UnitOfWork.

Now whenever you call `em.flush()` MikroORM will iterate over all entities you previously marked for persisting
via `em.persist()`.
For each object it will compare the original property and association values with the values that are currently set on
the object.
If changes are detected then the object is queued for a UPDATE operation. Only the fields that actually changed are
updated.

### Implicit transactions

First and most important implication of having Unit of Work is that it allows handling transactions automatically.

When you call `em.flush()`, all computed changes are queried inside a database transaction (if supported by given
driver).
This means that you can control the boundaries of transactions simply by calling em.persist() and once all your changes
are ready, simply calling flush() will run them inside a transaction.

:::info

You can also control the transaction boundaries manually via `em.transactional(cb)`.

:::

```ts
const user = await em.findOne(User, 1);
user.email = 'foo@bar.com';
const car = new Car();
user.cars.add(car);

// thanks to  cascading we only need to persist user entity
// flushing will create a transaction, insert new car and update user with new email
// if error is happened changes will be reverted automatically
await em.persistAndFlush(user);
```

### Request context

MikroORM uses identity map in background, so we will always get the same instance of one entity. But node.js is a single
threaded and processes all request in one "scope", so we must create new identity map for each request, or we will end
up with one context for whole application. As there would be only one shared Identity Map, we can't just clear it after
our request ends. There can be another request working with it so clearing the Identity Map from one request could break
other requests running in parallel. This will result in growing memory footprint, as every entity that became managed at
some point in time would be kept in the Identity Map.

To solve this, we can use `RequestContext` helper, that will use node's `AsyncLocalStorage` in the background to isolate
the
request context. MikroORM will always use request specific (forked) entity manager if available, so all we need to do is
to create new request context preferably as a middleware:

```ts
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
```

We should register this middleware as the last one just before request handlers and before any of our custom middleware
that is using the ORM. There might be issues when we register it before request processing middleware like `queryParser`
or `bodyParser`, so definitely register the context after them.

## Entity Relationships

There are 4 types of entity relationships in MikroORM:

- ManyToOne
- OneToMany
- OneToOne
- ManyToMany
-

Relations can be unidirectional and bidirectional. Unidirectional are defined only on one side (the owning side).
Bidirectional are defined on both sides, while one is owning side (where references are store), marked by `inversedBy`
attribute pointing to the inverse side.

### ManyToOne

:::note
Many instances of the current Entity refer to One instance of the referred Entity.
:::

There are multiple ways how to define the relationship, all of the following is equivalent:

```ts
@Entity()
export class Employee {

    @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!
    office!: Office;

    @ManyToOne(() => Office) // you can specify type manually as a callback
    office!: Office;

    @ManyToOne('Office') // or as a string
    office!: Office;

    @ManyToOne({entity: () => Office}) // or use options object
    office!: Office;
}
```

:::note
MikroORM default naming convention for SQL drivers is a snake_case. For given example tables named `employee`
and `office`
should exist in DB and `office_id` (if `id` is a primary key in office) column in `employee` is used to store id of the
office.
:::

### OneToMany

:::note
One instance of the current Entity has Many instances (references) to the referred Entity.
:::

Again, all of the following is equivalent:

```ts
@Entity()
export class Office {
    @OneToMany(() => Employee, employee => employee.office)
    employees!: Collection<Employee> = new Collection<Employee>(this);

    @OneToMany('Employee', 'office')
    employees = new Collection<Employee>(this);

    @OneToMany({mappedBy: employee => employee.office}) // referenced entity type can be sniffer too
    employees = new Collection<Employee>(this);

    @OneToMany({entity: () => Employee, mappedBy: 'office'})
    employees = new Collection<Employee>(this);

}
```

As you can see, OneToMany is the inverse side of ManyToOne (which is the owning side). More about how
[collections](https://mikro-orm.io/docs/collections) work can be found on collections page.

You can also specify how operations on given entity should [cascade](https://mikro-orm.io/docs/cascading) to the
referred entities.

### OneToOne

:::note
One instance of the current Entity refers to One instance of the referred Entity.
:::

This is a variant of ManyToOne, where there is always just one entity on both sides. This means that the foreign key
column is also unique.

```ts
@Entity()
export class Employee {

    @OneToOne() // when none of `owner/inverseBy/mappedBy` is provided, it will be considered owning side
    hardware!: Hardware;

    // side with `inversedBy` is the owning one, to define inverse side use `mappedBy`
    @OneToOne({inversedBy: 'employee'})
    hardware!: Hardware;

    // when defining it like this, you need to specifically mark the owning side with `owner: true`
    @OneToOne(() => Harware, hardware => harware.employee, {owner: true})
    hardware!: User;
}

//inverse side, Employee is the owner
@Entity()
export class Hardware {

    @OneToOne({mappedBy: 'hardware', orphanRemoval: true})
    employee!: Employee;

    @OneToOne(() => Employee, employee => employee.hardware)
    employee!: Employee;
}
```

### ManyToMany

:::note
Many instances of the current Entity refers to Many instances of the referred Entity.
:::

Here are examples of how you can define ManyToMany relationship:

```ts
@Entity()
export class Employee {

    // when none of `owner/inverseBy/mappedBy` is provided, it will be considered owning side
    @ManyToMany()
    projects = new Collection<Project>(this);

    @ManyToMany(() => Project, 'employees', {owner: true})
    projects = new Collection<Project>(this);

    // to define uni-directional many to many, simply provide only 
    @ManyToMany(() => Project)
    projects: Collection<Project> = new Collection<Project>(this);
}

//Inverse side
@Entity()
export class Project {

    @ManyToMany(() => Employee, 'projects')
    employees = new Collection<Employee>(this);
}
```

By default, a generated pivot table entity is used under the hood to represent the pivot table. For our example MikroORM
would
store relations in `employee_project` table using `employee_id` and `project_id` columns. If we need to add additional
data
to pivot tables we can provide our own implementation via `pivotEntity` option.

The pivot table entity needs to have exactly two many-to-one properties, where first one needs to point to the owning
entity and the second to the target entity of the many-to-many relation.

```ts
@Entity()
export class EmployeeAssigment {

    @ManyToOne({primary: true})
    employee!: Employee;

    @ManyToOne({primary: true})
    project!: Project;

    @Property()
    joinDate!: Date;

    @Property()
    billable!: boolean;
}

@Entity()
export class Employee {
    @ManyToMany(() => Project, 'employees', {owner: true, pivotEntity: () => EmployeeAssigment})
    projects = new Collection<Project>(this);
}

@Entity()
export class Project {
    @ManyToMany(() => Employee, 'projects', {pivotEntity: () => EmployeeAssigment})
    employees = new Collection<Employee>(this);
}
```

:::note
If we want to add new items to such M:N using collection `add()`, we need to have all non-FK properties to define a
database level default value. Alternatively, we can work with the pivot entity directly just like with all others
entities
:::

```ts
// create new item
const assigment = employeeAssigmentRepository.create({
    employee: 123,
    project: 321,
    joinDate: new Date(),
    billable: true
});
await employeeAssigmentRepository.persistAndFlush(assigment);

// or remove an item via delete query
employeeAssigmentRepository.nativeDelete({order: 123, product: 321});
```

## Type-Safe Relations and Collections

Entity relations are mapped to entity references - instances of the entity that have at least the primary key available.
This reference is stored in identity map, so you will get the same object reference when fetching the same document from
database.

```ts
class Employee {
    @ManyToOne()
    office!: Office;  // the value is always instance of the `Office` entity
}
```

You can check whether an entity is initialized via wrap(entity).isInitialized(), and use await wrap(entity).init() to initialize it. 
This will trigger database call and populate the entity, keeping the same reference in identity map.
```ts
console.log(employee.id); // accessing the id will not trigger any db call
console.log(wrap(employee.office).isInitialized()); // false
console.log(employee.office.address); // undefined

await wrap(employee.office).init(); // this will trigger db call
console.log(wrap(employee.office).isInitialized()); // true
console.log(employee.office.address); // defined
```

The isInitialized() method can be used for runtime checks, but that could end up being quite tedious - we can do better! 
Instead of manual checks for entity state, we can use the Reference wrapper.

When you define @ManyToOne and @OneToOne properties on your entity, TypeScript compiler will think that desired entities are always loaded:
```ts
const employee = await employeeRepository.findOne(1);
console.log(employee.office instanceof Office); // true
console.log(wrap(employee.office).isInitialized()); // false
console.log(employee.office.address); // undefined as `Office` is not loaded yet
```
You can overcome this issue by using the `Reference` wrapper. It simply wraps the entity, defining `load(): Promise<T>` method 
that will first lazy load the association if not already available. You can also use `unwrap(): T` method to access the 
underlying entity without loading it.

```ts
@Entity()
export class Employee {
    @ManyToOne(() => Office, { nullable: true, ref: true })
    office?: Ref<Office>;
}

const employee = await employeeRepository.findOne(1);
console.log(employee.office instanceof Reference); // true
console.log(wrap(employee.office).isInitialized()); // false
console.log(employee.office.name); // type error, there is no `name` property
console.log(employee.office.unwrap().name); // undefined as author is not loaded
console.log(await employee.office.load('name')); // ok, loading the author first
console.log((await employee.office.load()).name); // ok, author already loaded
console.log(employee.office.unwrap().name); // ok, author already loaded
```

Using `load()` method will actually make your models responsible for loading data, which can be messy when you trigger 
this calls everywhere in code. There are also getEntity() and getProperty() methods that are synchronous getters, 
that will first check if the wrapped entity is initialized, and if not, it will throw and error.

```ts
const employee = await employeeRepository.findOne(1);
console.log(employee.office instanceof Reference); // true
console.log(wrap(employee.office).isInitialized()); // false
console.log(employee.office.getEntity()); // Error: Reference<Author> 123 not initialized
console.log(employee.office.getProperty('name')); // Error: Reference<Author> 123 not initialized
console.log(await employee.office.load('name')); // ok, loading the author first
console.log(employee.office.getProperty('name')); // ok, author already loaded
```


## Migrations

:::note
To use migrations we need to first install @mikro-orm/migrations package for SQL driver
:::
As your application evolves over time so does your database schema. Everytime you add something to your models(or create
new ones)
you need to make changes in a database. The most straightforward way is to remember/wright down every SQL script and
then execute
it before deploy. As you may understand such approach is not scalable and error-prone.

To resolve such problem there is a mechanism called Migrations. We generate SQL scripts in code, ORM creates a table in
our
DB and tracks execution of every script. So when someone create new migration, during deploy ORM connects to DB, scan
migration
tables and understands that new file has not been executed yet and proceed to execution.

Migrations are classes that extend Migration abstract class:

```ts
import {Migration} from '@mikro-orm/migrations';

export class Migration20191019195930 extends Migration {

    async up(): Promise<void> {
        this.addSql('CRETE TABLE ...');
    }

}
```

To configure first we need to update `init` call and set some parameters:

```ts
await MikroORM.init({
    // default values:
    migrations: {
        tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
        path: './migrations', // path to the folder with migrations
        pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
        dropTables: true, // allow to disable table dropping
        safe: false, // allow to disable table and column dropping
        snapshot: true, // save snapshot when creating new migrations
        emit: 'ts', // migration generation mode
        generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
    },
})
```

Then we can use it via cli:

```bash
npx mikro-orm migration:create   # Create new migration with current schema diff
npx mikro-orm migration:up       # Migrate up to the latest version
npx mikro-orm migration:down     # Migrate one step down
npx mikro-orm migration:list     # List all executed migrations
npx mikro-orm migration:pending  # List all pending migrations
npx mikro-orm migration:fresh    # Drop the database and migrate up to the latest version
```

Or we can create a simple script where we initialize MikroORM like this:

```ts
(async () => {
    const orm = await MikroORM.init({
        dbName: 'our-db-name',
        // ...
    });

    const migrator = orm.getMigrator();
    await migrator.createMigration(); // creates file Migration20191019195930.ts
    await migrator.up(); // runs migrations up to the latest
    await migrator.up('name'); // runs only given migration, up
    await migrator.up({to: 'up-to-name'}); // runs migrations up to given version
    await migrator.down(); // migrates one step down
    await migrator.down('name'); // runs only given migration, down
    await migrator.down({to: 'down-to-name'}); // runs migrations down to given version
    await migrator.down({to: 0}); // migrates down to the first version

    await orm.close(true);
})();
```

MikroORM can generate files for you. For example, we can create two models in our project, `Employee` and `Office`,
set up relations and run `npx mikro-orm migration:create` in console. This will create a migration file for us:

<Tabs>
<TabItem value="employee" label="Employee">

```ts
@Entity()
export class Employee {
    @PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
    uuid!: string;

    @Property()
    name!: string;

    @Property()
    joinDate!: Date

    @ManyToOne(() => Office, {nullable: true, ref: true})
    office?: Ref<Office>;

    constructor(name: string, joinDate: Date) {
        this.name = name;
        this.joinDate = joinDate;
    }
}
```

</TabItem>
<TabItem value="office" label="Office">

```ts
@Entity()
export class Office {
    @PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
    uuid!: string;

    @Property()
    address!: string;

    @Property()
    city!: string;

    @OneToMany(() => Employee, employee => employee.office, {nullable: true})
    employees?: Collection<Employee> = new Collection<Employee>(this);

    constructor(address: string, city: string) {
        this.address = address;
        this.city = city;
    }
}
```

</TabItem>
<TabItem value="migration" label="Migration">

```ts
import {Migration} from '@mikro-orm/migrations';

export class Migration20221212134350 extends Migration {

    async up(): Promise<void> {
        this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

        this.addSql('create table "office" ("uuid" uuid not null default uuid_generate_v4(), "address" varchar(255) not null, "city" varchar(255) not null, constraint "office_pkey" primary key ("uuid"));');

        this.addSql('create table "employee" ("uuid" uuid not null default uuid_generate_v4(), "name" varchar(255) not null, "join_date" timestamptz(0) not null, "office_uuid" uuid null, constraint "employee_pkey" primary key ("uuid"));');

        this.addSql('alter table "employee" add constraint "employee_office_uuid_foreign" foreign key ("office_uuid") references "office" ("uuid") on update cascade on delete set null;');
    }

    async down(): Promise<void> {
        this.addSql('alter table "employee" drop constraint "employee_office_uuid_foreign";');

        this.addSql('drop table if exists "office" cascade;');

        this.addSql('drop table if exists "employee" cascade;');
    }

}

```

</TabItem>
</Tabs>

- CRUD example