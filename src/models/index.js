// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "ADMIN": "ADMIN",
  "USER": "USER"
};

const { User } = initSchema(schema);

export {
  User,
  UserRole
};