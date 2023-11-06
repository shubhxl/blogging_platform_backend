import pgPromise from 'pg-promise';
import config from 'config';

const dbConfig: any = {
  database: config.get('Database.database'),
  port: config.get('Database.port'),
  user: config.get('Database.user'),
  password: config.get('Database.password'),
};

export const db = pgPromise()(dbConfig);
