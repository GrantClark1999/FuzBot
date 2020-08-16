import { ActionDoc } from '../types';
import createCollection from '../helpers/createCollection';

const db = createCollection('actions.db');

export default function loadActions() {
  return db.load();
}
