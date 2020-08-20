import { ipcMain } from 'electron';
import createCollection from '../helpers/createCollection';
import { PointsDoc } from '../types';

const db = createCollection('points.db');

ipcMain.on('setPointsImage', (_event, pointsImage: string) => {
  db.update({}, { pointsImage }, { upsert: true, multi: false });
});

ipcMain.on('fetchPointsImage', async (event) => {
  const doc = <PointsDoc>await db.findOne({});
  event.reply('fetchedPointsImage', doc?.pointsImage);
});

export default db;
