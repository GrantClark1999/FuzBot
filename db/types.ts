import { AccessTokenData } from 'twitch/lib/API/AccessToken';
import { PubSubRedemptionMessageData } from 'twitch-pubsub-client/lib/Messages/PubSubRedemptionMessage';

// Document Types
export type ActionDoc = {
  _id?: string;
  position: number;
  rewardId: string;
  events: string[];
};

export type ChannelDoc = {
  _id?: string;
  active?: boolean;
  channelId: string;
  displayName: string;
  token: AccessTokenData;
  picture?: string;
};

export type DeviceDoc = {
  _id?: string;
  position: number;
  alias: string;
  host: string;
};

export type PointsDoc = {
  pointsImage: string;
};

export type RedemptionDoc = PubSubRedemptionMessageData;

export type RewardDoc = {
  _id?: string;
  position: number;
  rewardId: string;
  rewardName: string;
  rewardCost: number;
  rewardBgColor: string;
  rewardImage: string;
  warn?: boolean;
  isQueued: boolean;
};

export type UserDoc = {
  _id?: string;
  userId: string;
  userName: string;
  displayName: string;
  numRedeemed: number;
  spent: number;
};
