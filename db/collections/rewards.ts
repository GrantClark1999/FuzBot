import { ipcMain } from 'electron';
import { RedemptionDoc, RewardDoc } from '../types';
import createCollection from '../helpers/createCollection';

const db = createCollection('rewards.db');
db.ensureIndex({ fieldName: 'rewardId', unique: true });

// Create / Update
ipcMain.on('logRedemption', async (_event, doc: RedemptionDoc) => {
  const rewardDoc = translate(doc, await db.count({}));
  update(rewardDoc);
});

ipcMain.on('logReward', async (_event, doc: RewardDoc) => {
  update(doc);
});

ipcMain.on('updateRewardOrder', (_event, docs: RewardDoc[]) => {
  const newDocs = [...docs];
  for (let i = 0; i < newDocs.length; i += 1) {
    newDocs[i].position = i;
    update(newDocs[i]);
  }
});

ipcMain.on('updatePointsImage', (_event, pointsImage: string) => {
  db.update({}, { $set: { pointsImage } });
});

// Read
ipcMain.once('fetchAllRewards', async (event) => {
  event.returnValue = await db.find({});
});

// Helper Functions
function update(doc: RewardDoc) {
  const { rewardId } = doc;
  return db.update({ rewardId }, doc, { upsert: true });
}

function translate(message: RedemptionDoc, position: number): RewardDoc {
  const { reward } = message.data.redemption;
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

export default function loadRewards() {
  return db.load();
}

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
