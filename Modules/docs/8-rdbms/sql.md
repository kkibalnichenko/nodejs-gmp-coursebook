# Relational Databases

## What is a relational database

A relational database (RDB) is type of database that stores a collection of data items with pre-defined 
relationships between them. These items are organized as a set of tables with columns and rows. Tables usually represent
some object that is connected to your business domain, i.e. you might have table `Users` to store all your users. 
Each column in a table holds a certain kind of data and a field stores the actual value of an attribute.
There are many data types in RDB: strings, integers, decimals, binary and even json, so you can store any kind of data.

The rows in the table represent a record and contains all values from its columns. 
Each row in a table should be marked with some unique identifier called a primary key. Like everyone has its own unique
passport number that helps to identify you, so every row in table has its own unique identifier.
Using primary keys we can build relations between objects, i.e. tax office may store information about you and uses your passport number 
(or other unique identifier, depending on your country) to identify and check all your operations. 
So basically there is a relation between records in different tables build by using unique identifiers.

You can think about RDB as a set of tables in your Excel document, each table represents a tab,
and you added some unique identifier to each row (primary key or PK). So let's imagine a common e-commerce
application, where users can buy some stuff. When you register system creates a record in `Users` table, assigns 
a unique key to you and store all your data there, let it be your name and age for simplicity. When someone 
makes a purchase system may create a record and store it in `Purchases` table. To maintain a relation 
and to track who actually made each of purchases system stores your PK from `Users` table. 

![RDB simple example](/img/rdb/rdb-example.PNG)

Thanks to these relations, unlike from NoSQL where you should think about table structure and object compositions beforehand, because it affects 
how you will retrieve your data and relations, in RDB this data can be accessed in many different
ways without reorganizing the database tables themselves. 


### What is RDBMS
The software used to store, manage, query, and retrieve data stored in a relational database is called a relational database 
management system (RDBMS). The RDBMS provides an interface between users and applications and the database, as well as 
administrative functions for managing data storage, access, and performance. A RDBMS incorporates the relational-data model, 
basics of which we have described above, normally including a Structured Query Language (SQL) application programming interface. 
So just like there are several Web browsers on the market, each with some unique features but still they support JS, HTML and CSS,
the same situation with RDBMS. There are several of them, each has its own features, performance, maintainability costs 
and can even have extended SQL syntax, like new operators etc. But they are all built on top of the relational model 
and support common SQL syntax.

![most popular rdbms](/img/rdb/rdbms.PNG)

Above listed some of the most popular RDBMS, probably you have heard some names from this list.
- **MySQL** is a database by Oracle Corporation, first released in 1995. It's one of the most stable open-source databases available today. 
Facebook and Uber use it in their applications. YouTube uses MySQL to store all the metadata for the videos. While it is a good place to start, 
MySQL is not the best if you want advanced data protection features like throttling and masking. 
It is also not the best with semi-structured data like JSON.
- **PostgreSQL** is another open source database. It uses and extends SQL (hence the name), and is broadly extensible to a range of use cases beyond mere transactional data. 
It handles semi-structured data such as JSON and has great support for distributed SQL. The latter is useful when working with millions of transactions on the web.
- **Oracle** - developed in 1979 by the current CTO of Oracle, Larry Ellison, Oracle remains a popular SQL database especially for enterprise-grade RDBMSs.
It is indeed quite advanced, offers wonderful features for both structured and semi-structured data, supports blockchain tables,
facilitates lightning-fast transactions. However, it does have a major downside compared to the other two databases discussed so far: 
it is not open source, and it is not pocket-friendly.
- **SQL Server** is a popular Microsoft database offering in the market. SQL Server is a paid database; 
it garners corporate support due to the Microsoft brand name and the compatibility support for other Microsoft applications.

In current program we will stick to PostgresSQL, because it's opensource, easy to install yet powerful database with lots of demand on a market 

### Transactions and ACID  
One of the greatest feature of relational databases is transactions. A transaction is some set of database operations 
that is treated as a "whole". It has to either complete successfully all its operations or to not make any changes at all. 
Let`s consider next example, you want to transfer 20$ to your friend, you open your bank app in your phone and transfer funds. 
What happens under the hood? Probably, transfer consists of several operations, at first 20$ are withdrawn from your accounts,
and on the next step are added to your friends account. But what would happen if some error was thrown in application after 1st step?

![transaction example](/img/rdb/money-transfer-transaction.PNG)

Money were withdrawn, but not transferred, you and your friend are unhappy, and probably your bank hired developers who 
don't know about transactions. This two operations should be wrapped into database transaction, so if such error was thrown 
database would revert all changes, and you would have all your money.

All database transactions in any RDBMS are **ACID** compliant or Atomic, Consistent, Isolated and Durable to ensure data integrity.

**Atomicity** defines that all operations in transaction treated as one "unit", which either succeeds completely or 
fails completely: if any of the statements constituting a transaction fails to complete, the entire transaction fails
and the database is left unchanged. In previous example transaction consists of two operations with different bank accounts
and its naturally that bank wants to roll back any changes if something goes wrong.

**Consistency** ensures that a transaction can only bring the database from one valid state to another.
Database can have some constraints in tables, i.e. unique columns, cascades, triggers, foreign keys etc. and
any data written to the database must be valid according to all defined rules. 
This prevents database corruption by an illegal transaction.

**Isolation** helps to isolate one transaction from another, because often operations are run simultaneously one transaction
may affect results of another if changes are persisted immediately. In RDBMS changes usually can be seen only after transaction 
is finished,so the effects of an incomplete transaction might not even be visible to other transactions. 

**Durability** guarantees that once a transaction has been committed, it will remain committed even in the case of a system failure 
(e.g., power outage or crash). This usually means that completed transactions are recorded not is some cache
but in non-volatile memory immediately, unlike from eventually consistent NoSql. 

- When do I need RDB for my project

## Data modelling

### Normalisation

Before you start creation of your database you need to understand what tables and what relations there will be.
Usually you can start from some very simple excel-like form of real data and apply normalisation techniques to build your model.
Normalisation is a database design technique that reduces data redundancy and eliminates undesirable characteristics like 
Insertion, Update and Deletion Anomalies. Normalisation rules divides larger tables into smaller tables and links them using relationships.
The purpose of Normalisation in SQL is to eliminate redundant (repetitive) data and ensure data is stored logically.
There are 6 normal forms, however, in most practical applications, normalisation achieves its best in 3rd Normal Form.


Database Normalization can be easily understood with the help of a case study. 
Assume, we need to store information about EPAM employees. At first lets write data in table without any normalization in database, 
all information is stored in one table as shown below, and `project` column even has some nested data.

![zero normal form](/img/rdb/0-NF.PNG)

Notice, that project data is duplicated, and it will be hard to query such data. Of course databases has json column and
it`s technically possible to create such structure but current model has update, insert and delete anomalies.

**Update anomaly** happens because information is duplicated in several rows. Everyone who works on the same project or office will 
have the same information, and if we needed to update a project code, we would have to scan all rows and update the data.
If your database has 10 rows it`s not a problem, but what if it has millions of rows?

![update anomaly](/img/rdb/update-anomaly.PNG)

**Deletion Anomaly** happens when removing a row causes removal of more than one set of facts.  
For instance, if John Black deleted, and he was the only one person on a project,
 then deleting that row would cause us to lose information about the project.

![deletion anomaly](/img/rdb/deletion-anomaly.PNG)

**Insert Anomaly** present because we cannot insert record until we know information for the entire row.
In our example we cannot record a new project or office until we have some developer information.
Why?  Because in order to create the record, we need provide all other employee data.

![insert anomaly](/img/rdb/insert-anomaly.PNG)


#### 1 Normal form
To satisfy First normal form, each column of a table must have a single value. 
Columns which contain sets of values or nested records are not allowed, each record needs to be unique. 
Project column violates this rules, because it contains a nested record, also our rows may not be a unique, because several persons
can have the same name. A common technique is to move nested data into separate table, and link two tables using primary keys.
Also, we have added ID field to our Employees table, because names are not unique.

![1-NF](/img/rdb/1-NF.PNG)

#### 2 Normal form
If a table has a single column primary key, it automatically satisfies 2NF, but if a table has a multi-column or composite
key then it may not satisfy 2NF. Our models have a single columns primary key, so let`s modify our example a little. 
It's possible that some employees may work on more than one project at a time and can have 
not billable positions, so following 1NF lets create separate table, because as we already know we need to avoid nested values.

![2-NF](/img/rdb/2-NF.PNG)

To identify each record we can create a composite key using employeeID and projectID column. Combinations of both columns
will always give a unique result so knowing projectId and employeeId we will always get one specific record. Now we need to check
that all other columns depends on full composite key, not on some part of it. `JoinDate` and `Billable` both depends on particular 
employee and project, because different developers even on the same project may have different billable type. But `InternalProject`
depends only on `ProjectId`, it has nothing to do with `EmployeeId`, so this column is not dependent on full composite key.
What we should do is remove this column from table, and move it to another place, `Project` table is a perfect destination.
This will remove update anomaly from our table and if project type is changed we will update it in only 1 place and not throughout whole
`employee_project` table. After changes our model in 2NF will look like this.

![2-NF-final](/img/rdb/2-NF-final.PNG)


#### 3 Normal form

The third normal form states that you should eliminate fields in a table that do not depend on the key.

- A Table is already in 2 NF
- Non-Primary key columns shouldn’t depend on the other non-Primary key columns
- There is no transitive functional dependency

In a simple words, values in a record that are not part of that record's key do not belong in the table. In general, anytime the contents
of a group of fields may apply to more than a single record in the table, consider placing those fields in a separate table.
Let's check our model, we have `Office Address` and `Office City` and here we have functional dependency.

![functional-dep](/img/rdb/functional-dep.PNG)

Office city rather depends on office address than on employeeId, and also you can check yourself that information of address and city
will be duplicated lots of time, and thats and update anomaly. So to make our model satisfy 3NF we need to move office information
from Employees table.

![3-NF](/img/rdb/3-NF.PNG)

Now there are no updates anomalies, no insert anomalies and no deletion anomalies.

:::caution

Adhering to the third normal form, while theoretically desirable, is not always practical. If you have a Customers table 
and you want to eliminate all possible duplications, you must create separate tables for cities, ZIP codes, 
customer classes, and any other factor that may be duplicated in multiple records. In theory, normalization is worth pursing. 
However, many small tables may degrade performance or exceed open file and memory capacities.

:::

### Relationships
Now that you understand the modelling process and when you have your data held in clearly defined, compact tables, 
you can connect or relate the data held in different tables. There are three types of relationships between the data you are 
likely to encounter: one-to-one, one-to-many, and many-to-many. To be able to identify these relationships, you need to examine 
the data and have an understanding of what business rules apply to the data and tables.

#### One-to-one
A one-to-one (1:1) relationship means that each record in Table A relates to one, and only one, record in Table B, 
and each record in Table B relates to one, and only one, record in Table A. 
Look at the following example of tables from a company's Employees database:

![one-to-one](/img/rdb/one-to-one.PNG)

Let’s say you’re organizing employee information, and you also want to keep track of each employee’s computer.
Since each employee only gets one computer and those computers are not shared between employees, you could add fields to your Employee table
that hold information like the OS, year, RAM of each computer. However, that can get messy from a semantic standpoint —
does computer information really belong in a table about employees? That’s for you to decide,
but another option is to create a Computers table with a one-to-one relationship to the Employee table.
Relationship maintained by foreign key (FK) and `laptopId` points to one specific laptop. If we make a unique index from `laptopId`
it will become impossible to assign one computer to several employees. 

#### One-to-many
One-to-many relationships are the most common type of relationships between tables in a database.
In a one-to-many (sometimes called many-to-one) relationship, a record in one table corresponds to zero, one, or many records 
in another table. Relationship is also maintained by FK column in one of the tables. 
Let's take our previous example and say that now every person may have several laptops. All that we need to do is to 
move FK column to `Laptops` table.

![one-to-many](/img/rdb/one-to-many.PNG)

Now, every employee can have zero, one or several laptops, but laptop can be own only by one employee.


#### Many-to-many

A many-to-many relationship indicates that multiple records in a table are linked to multiple records in another table. 
Those records may only be associated with a single record (or none at all) but the key is that they can and often are linked 
to more than one. Many-to-many relation is implemented by creating a third table, known as a join table,
and create one-to-many relationships between it and your two starting tables. 
Imagine that you need to store information about employees and theirs projects. There are lots of employees and projects,
one employee can work on several projects and one project usually has some team of developers. We have already had example
of many-to-many relationship for such business rules, check 2NF once more.

![many-to-many](/img/rdb/2-NF-final.PNG)

Here you can see join table and common technique is to create composite primary key using primary keys from main tables.
So we took `employeeId` and `projectId` for composite key,combination of these will always point us at one particular row.


### Indexes and keys

A _KEY_ in SQL is a value used to identify records in a table uniquely. An SQL KEY is a single column or combination of
multiple columns used to uniquely identify rows or tuples in the table. SQL Key is used to identify duplicate information,
and it also helps establish a relationship between multiple tables in the database.

:::note

Columns in a table that are NOT used to identify a record uniquely are called non-key columns.

:::

#### What is a Primary Key (or PK)? 

A primary is a single column value used to identify a database record uniquely.

It has following attributes:

- A primary key cannot be NULL
- A primary key value must be unique
- The primary key values should rarely be changed
- The primary key must be given a value when a new record is inserted.

#### What is Composite Key? 

A composite key is a primary key composed of multiple columns used to identify a record uniquely.

![composite-key](/img/rdb/composite-key.PNG)

In a given example we have two offices in the same city Kharkiv, but they are situated on a different streets. We cannot 
also identify office only be street, because there are lots of streets with same name throughout country, so composite key
helps us uniquely identify one particular office.

#### What is Foreign Key?

We have already used Foreign Keys (FK) during normalization process to build relations.

![foreign-key](/img/rdb/foreign-key.PNG)

Foreign Key references the primary key of another Table! It helps connect your Tables.

- A foreign key can have a different name from its primary key
- It ensures rows in one table have corresponding rows in another
- Unlike the Primary key, they do not have to be unique. Most often they aren’t
- Foreign keys can be null even though primary keys can not

![foreign-key2](/img/rdb/foreign-key2.PNG)

Why do you need a foreign key? Suppose, a novice inserts a record in `Hardware` such as

![foreign-key-integrity](/img/rdb/fk-integrity.PNG)

You will only be able to insert values into your foreign key that exist in the unique key in the parent table. 
This helps in referential integrity.

#### Indexes

Indexing is the way to get an unordered table into an order that will maximize the query’s efficiency while searching.
When there is no index, and you try to search something in database its engine has to scan through every row to find
all matching records. While nowadays hardware can be really performant still such operations are time-consuming, 
especially if you have millions and millions of rows. Looking through every single row is not very efficient.

For example, the table below represents hardware list, that is completely unordered.
The database would have to search through all 10 rows in the order they appear in the table, from top to bottom, one at a time.
So to search for all of the potential instances of the `RAM` equals to 64, the database must look through the entire 
table for all appearances of 64 in the `RAM` column.

![search-example](/img/rdb/searching-example.PNG)

What indexing does is sets up the column in a sorted order to assist in optimizing query performance.
The index causes the database to create a data structure,and this structure type is very likely a B-Tree. 
While the advantages of the B-Tree are numerous, the main advantage for our purposes is that it is sortable.

![btree](/img/rdb/btree.PNG)

As you see B-Tree greatly reduces the number of comparisons. What it does under the hood is also stores pointers which 
are simply reference information for the location of the additional information in memory. 
Basically the index holds the column value and that particular row’s home address on the memory disk.
With that index, the query can search for only the rows in the column that have 15 value and then using the pointers 
can go into the table to find the specific rows where that pointer lives.

:::caution

Keep in mind that indexes are separate datastructures, and they need additional disk and memory space. When new record is inserted 
or indexed column value is updated B-Tree should be updated too. So you cannot simply throw index on every column in your
50-column table. Technically its possible of course, but performance will degrade over time as the numbers of rows in table increases.

Use indexes on the most "popular" columns, that are used in queries frequently.
:::

## SQL basics
- DDL
- DML (selects,inserts,updates,deletes)
- How to query relations
- Transactions

## How to use it in Node
- Node native postgres module
- ORMs (overview, pros/cons)

## MikroORM and example
- Overview
- Migrations
- Models and relations
- Transactions
- CRUD example