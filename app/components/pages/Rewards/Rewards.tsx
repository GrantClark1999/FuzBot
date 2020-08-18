import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { RewardDoc } from '../../../../db/types';
import Reward from './Reward';
import classes from './Rewards.css';

const SortableRewardItem = SortableElement(
  ({ reward }: { reward: RewardDoc }) => {
    const {
      rewardName,
      rewardCost,
      pointsImage,
      rewardImage,
      rewardBgColor,
    } = reward;
    return (
      <div className={classes.reward}>
        <Reward
          rewardName={rewardName}
          rewardCost={rewardCost}
          pointsImage={pointsImage}
          rewardImage={rewardImage}
          rewardBgColor={rewardBgColor}
        />
      </div>
    );
  }
);

const SortableRewardList = SortableContainer(
  ({ rewards }: { rewards: RewardDoc[] }) => {
    return (
      <div className={classes.rewards}>
        {rewards.map((reward, index) => (
          <SortableRewardItem
            key={`reward-${reward.rewardId}`}
            index={index}
            reward={reward}
          />
        ))}
      </div>
    );
  }
);

const rewards = [
  {
    position: 0,
    rewardId: '0',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: 5000,
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#cc0000',
    isQueued: false,
  },
  {
    position: 1,
    rewardId: '1',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: 5000,
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#cccc00',
    isQueued: false,
  },
  {
    position: 2,
    rewardId: '2',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: 5000,
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#00cc00',
    isQueued: false,
  },
  {
    position: 3,
    rewardId: '3',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: 5000,
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#00cccc',
    isQueued: false,
  },
  {
    position: 4,
    rewardId: '4',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: 5000,
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#0000cc',
    isQueued: false,
  },
  {
    position: 5,
    rewardId: '5',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: 5000,
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#cc00cc',
    isQueued: false,
  },
  {
    position: 6,
    rewardId: '6',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: 5000,
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#cccccc',
    isQueued: false,
  },
  {
    position: 7,
    rewardId: '7',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: 5000,
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#000000',
    isQueued: false,
  },
];

export default function Rewards() {
  // TODO: Outsource to Redux state
  const [rewardList, setRewardList] = useState(rewards);

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    setRewardList(arrayMove(rewardList, oldIndex, newIndex));
  }

  return (
    <SortableRewardList rewards={rewardList} onSortEnd={onSortEnd} axis="xy" />
  );
}
