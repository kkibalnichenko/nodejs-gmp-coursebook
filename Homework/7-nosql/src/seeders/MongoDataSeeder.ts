import { connect, connection } from 'mongoose';
import * as dotenv from 'dotenv';
import { User } from '../resources/user/user.model';

dotenv.config();

const { DATABASE_HOST, DATABASE_PORT, MONGO_INITDB_DATABASE, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } =
  process.env;

(async () => {
  try {
    await connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${MONGO_INITDB_DATABASE}`, {
      user: MONGO_INITDB_ROOT_USERNAME,
      pass: MONGO_INITDB_ROOT_PASSWORD,
    });

    console.log('Database initialized');

    await User.insertMany([{}, {}, {}]);

    await  connection.close();
  } catch (error) {
    console.error(error);
  }
  }
)();