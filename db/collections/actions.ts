import { ActionDoc } from '../types';
import createCollection from '../helpers/createCollection';

const db = createCollection('actions.db');

export function loadActions() {
  db.load();
}

export default db;
