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
To bypass authentication set up ```x-user-id``` Header with ```b705c113-de0d-4d56-9442-813363f01dda```
value
