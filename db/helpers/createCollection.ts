import { app } from 'electron';
import Datastore from 'nedb-promises';

export default function createCollection(fileName: string) {
  const path = `${
    process.env.NODE_ENV === 'development' ? './db' : app.getAppPath()
  }/data/${fileName}`;
  return Datastore.create(path);
}
