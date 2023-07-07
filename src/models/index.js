// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Robot } = initSchema(schema);

export {
  Robot
};