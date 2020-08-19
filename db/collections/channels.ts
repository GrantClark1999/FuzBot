import { ipcMain } from 'electron';
import AccessToken from 'twitch/lib/API/AccessToken';
import { ChannelDoc } from '../types';
import createCollection from '../helpers/createCollection';

const db = createCollection('channels.db');
db.ensureIndex({ fieldName: 'channelId', unique: true });
db.ensureIndex({ fieldName: 'active', unique: true });

// Create
ipcMain.on('login', async (event, doc: ChannelDoc) => {
  const storedDoc = await makeActive(doc);
  event.reply('logged-in', storedDoc);
});

// Read
export async function fetchActiveToken(): Promise<AccessToken> {
  return (<ChannelDoc>await db.findOne({ active: true })).token;
}

ipcMain.once('fetchAuthData', async (event) => {
  const doc: ChannelDoc = await db.findOne({ active: true });
  if (doc) {
    const { displayName, picture } = doc;
    event.returnValue = { displayName, picture };
  } else {
    event.returnValue = {};
  }
});

// Update
ipcMain.on('updateActive', (_event, token: AccessToken) => {
  db.update({ active: true }, { $set: token });
});

// Helpers
async function makeActive(doc: ChannelDoc) {
  const numActive = await db.count({ active: true });
  // Ensure no more than one active channel at a time
  if (numActive > 1) {
    throw new Error(
      `Active channels exceeds 1! Current active channels: ${numActive}`
    );
  }
  // If a channel is active, deactivate it.
  if (numActive === 1) {
    await db.update({ active: true }, { $unset: { active: true } });
  }

  doc.active = true;
  const { channelId } = doc;
  const newDoc = await db.update({ channelId }, doc, {
    upsert: true,
    multi: false,
    returnUpdatedDocs: true,
  });
  return newDoc;
}

export function loadChannels() {
  return db.load();
}

export default db;

// Read
// function find(partialDoc: Partial<ChannelDoc>) {
//   return db.findOne(partialDoc);
// }

// function findById(channelId: string): Promise<ChannelDoc> {
//   return db.findOne({ channelId });
// }

// function findActive(): Promise<ChannelDoc> {
//   return db.findOne({ active: true });
// }

// async function findAll(): Promise<ChannelDoc[]> {
//   return db.find({});
// }

// function countActive() {
//   return db.count({ active: true });
// }

// // Update / Create
// function update(doc: ChannelDoc) {
//   const { channelId } = doc;
//   return db.update({ channelId }, doc, {
//     upsert: true,
//     multi: false,
//     returnUpdatedDocs: true,
//   });
// }

// function updateActive(doc: Partial<ChannelDoc>) {
//   return db.update(
//     { active: true },
//     { $set: doc },
//     { returnUpdatedDocs: true }
//   );
// }

// function updateActiveToInactive() {
//   return db.update(
//     { active: true },
//     { $unset: { active: true } },
//     { returnUpdatedDocs: true }
//   );
// }

// // Delete
// function remove(channelId: string) {
//   return db.remove({ channelId }, {});
// }

// function removeAll() {
//   return db.remove({}, { multi: true });
// }
