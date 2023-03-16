print('Start user creation...');

db = db.getSiblingDB('mongo_db');

db.createUser(
    {
        user: 'mongo_user',
        pwd: 'mongo_user_password',
        roles: [{ role: 'readWrite', db: 'mongo_db' }],
    },
);

db.createCollection('users');

print('All users created successefully!');
