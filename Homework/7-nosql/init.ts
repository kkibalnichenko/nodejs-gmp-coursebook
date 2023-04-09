import { connect, model } from 'mongoose';
import * as dotenv from 'dotenv';
import * as console from 'console';

dotenv.config();

const { DATABASE_HOST, DATABASE_PORT, MONGO_INITDB_DATABASE, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } =
  process.env;

export const init = async () => {
  try {
    await connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${MONGO_INITDB_DATABASE}`, {
      user: MONGO_INITDB_ROOT_USERNAME,
      pass: MONGO_INITDB_ROOT_PASSWORD,
    });

    console.log('Database initialized');
  } catch (error) {
    console.error(error);
  }
};
