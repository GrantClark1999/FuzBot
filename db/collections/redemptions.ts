import { ipcMain } from 'electron';
import { RedemptionDoc } from '../types';
import createCollection from '../helpers/createCollection';

const db = createCollection('redemptions.db');

// Create
ipcMain.on('logRedemption', (_event, doc: RedemptionDoc) => {
  db.insert(doc);
});

// Read
ipcMain.on(
  'fetchRedemptions',
  async (event, numDocs?: number, skip?: number, fromUser?: string) => {
    let docsCursor = db
      .find({ 'data.redemption.user.id': fromUser })
      .sort({ 'data.timestamp': -1 });
    if (skip) {
      docsCursor = docsCursor.skip(skip);
    }
    if (numDocs) {
      docsCursor = docsCursor.limit(numDocs);
    }
    const docs = await docsCursor;
    event.reply('redemptionLogs', docs);
  }
);

// Delete
ipcMain.on('deleteAllRedemptions', () => {
  db.remove({}, { multi: true });
});

ipcMain.on('deleteOldRedemptions', (_event, days: number) => {
  const oldestDate = new Date(Date.now() - days * 86400000).toISOString();
  db.remove({ 'data.timestamp': { $lte: oldestDate } }, { multi: true });
});

export default function loadRedemptions() {
  return db.load();
}

// // Create
// function insert(doc: RedemptionDoc) {
//   return db.insert(doc);
// }

// // Read
// async function findAll() {
//   return db.find({});
// }

// async function findAllSorted() {
//   return db.find({}).sort({ 'data.timestamp': -1 });
// }

// async function findAllFromUserSorted(userId: string) {
//   return db
//     .find({ 'data.redemption.user.id': userId })
//     .sort({ 'data.timestamp': -1 });
// }

// // Delete
// function removeAll() {
//   return db.remove({}, { multi: true });
// }

// /**
//  * Remove all records of redemptions that are older than the number of
//  * specified days.
//  * @param days Keep only "days" old redemptions
//  * @param cb Callback
//  */
// function removeOld(days: number) {
//   const oldestDate = new Date(Date.now() - days * 86400000).toISOString();
//   return db.remove({ 'data.timestamp': { $lte: oldestDate } }, { multi: true });
// }
