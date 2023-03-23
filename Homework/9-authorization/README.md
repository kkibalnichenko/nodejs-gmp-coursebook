Example application with PostgreSQL and MikroORM

### Run database container

```bash
Open root folder
Start:

$ docker-compose up -d

Stop:

$ docker-compose stop

Stop and clear database:

$ docker-compose stop -v

clear all volumes
```
### install dependencies
```
npm install

create .env file next to .env.example and copy content from example file there
```

### create test data in DB
```
npx mikro-orm seeder:run --class=TestDataSeeder
```

### start local server
```
npm start dev
```

### Testing
To register new user please use:
```
POST http://localhost:3000/register
Content-Type: application/json

{
  "email": "<email>",
  "password": "<password>"
}
``` 

To login with existing user use the following:
```
POST http://localhost:3000/login
Content-Type: application/json

{
  "email": "<email>",
  "password": "<password>"
}
```

Login endpoint will return you token that you should send in `Authorization` header as `Bearer <token>`
