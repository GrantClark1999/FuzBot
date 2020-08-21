import { ipcMain } from 'electron';
import { RedemptionDoc, RewardDoc } from '../types';
import createCollection from '../helpers/createCollection';

const db = createCollection('rewards.db');
db.ensureIndex({ fieldName: 'rewardId', unique: true });

// Create / Update
ipcMain.on('logReward', (_event, doc: RewardDoc) => {
  update(doc);
});

ipcMain.on('logRewardFromRedemption', async (_event, doc: RedemptionDoc) => {
  const rewardDoc = translate(doc, await db.count({}));
  update(rewardDoc);
});

ipcMain.on('updateRewardList', async (_event, updatedDocs: RewardDoc[]) => {
  const storedDocs = <RewardDoc[]>await db.find({});
  storedDocs.forEach((oldDoc) => {
    const matchingDoc = updatedDocs.find(
      (doc) => doc.rewardId === oldDoc.rewardId
    );
    if (matchingDoc) {
      const { rewardId, position } = matchingDoc;
      if (position !== oldDoc.position) {
        db.update({ rewardId }, { $set: { position } });
      }
    } else {
      db.remove({ rewardId: oldDoc.rewardId }, { multi: false });
    }
  });
});

// Read
ipcMain.once('fetchRewardList', async (event) => {
  const docs = await db.find({});
  event.reply('fetchedRewardList', docs);
});

// Helper Functions
function update(doc: RewardDoc) {
  const { rewardId } = doc;
  return db.update({ rewardId }, doc, { upsert: true });
}

function translate(doc: RedemptionDoc, position: number): RewardDoc {
  const { reward } = doc.data.redemption;
  return {
    position,
    rewardId: reward.id,
    rewardName: reward.title,
    rewardCost: reward.cost,
    rewardBgColor: reward.background_color,
    rewardImage: reward.image?.url_4x ?? reward.default_image.url_4x,
    isQueued: !reward.should_redemptions_skip_request_queue,
  };
}

export default db;

// Read
// function find(rewardId: string) {
//   return db.findOne({ rewardId });
// }

// async function findAll() {
//   return db.find({});
// }

// async function findAllSorted() {
//   return db.find({}).sort({ position: 1 });
// }

// function countAll() {
//   return db.count({});
// }

// // Update / Create

// async function updateFromRedemption(redDoc: RedemptionDoc) {
//   const doc = translate(redDoc, await countAll());
//   return update(doc);
// }

// function updatePosition(rewardId: string, position: number) {
//   return db.update({ rewardId }, { $set: { position } });
// }

// // Delete
// function remove(rewardId: string) {
//   return db.remove({ rewardId }, { multi: false });
// }

// function removeAll() {
//   return db.remove({}, { multi: true });
