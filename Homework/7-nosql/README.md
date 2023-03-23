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
npm run mongo-seeder
```

### start local server
```
npm start dev
```

### Testing
```POST /api/user/create``` - create new user. Authentication set up ```x-user-id``` Header with received id.
value
