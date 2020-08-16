import { RedemptionDoc, UserDoc } from '../types';
import createCollection from '../helpers/createCollection';

const db = createCollection('users.db');

// Read
async function findAll() {
  return db.find({});
}

type SortBy = 'numRedeemed' | 'spent';
async function findAllSorted(by: SortBy) {
  switch (by) {
    case 'numRedeemed':
      return db.find({}).sort({ numRedeemed: -1 });
    case 'spent':
      return db.find({}).sort({ spent: -1 });
    default:
      return db.find({});
  }
}

// Update / Create
function update(doc: UserDoc) {
  const { userId, userName, displayName, numRedeemed, spent } = doc;
  return db.update(
    { userId },
    { $set: { userName, displayName }, $inc: { numRedeemed, spent } },
    { upsert: true }
  );
}

function updateFromRedemption(redDoc: RedemptionDoc) {
  const doc = translate(redDoc);
  return update(doc);
}

// Helper functions
function translate(message: RedemptionDoc): UserDoc {
  const { user, reward } = message.data.redemption;
  return {
    userId: user.id,
    userName: user.login,
    displayName: user.display_name,
    numRedeemed: 1,
    spent: reward.cost,
  };
}

export default function loadUsers() {
  return db.load();
}
