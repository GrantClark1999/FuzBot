import { DeviceDoc } from '../types';
import createCollection from '../helpers/createCollection';

const db = createCollection('devices.db');

export default function loadDevices() {
  return db.load();
}
