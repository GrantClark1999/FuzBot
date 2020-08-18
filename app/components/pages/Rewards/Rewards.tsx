import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Reward from './Reward';
import classes from './Rewards.css';

type RewardType = {
  rewardId: string;
  rewardName: string;
  rewardCost: string;
  pointsImage: string;
  rewardImage: string;
  rewardBgColor: string;
};

const SortableRewardItem = SortableElement(
  ({ reward }: { reward: RewardType }) => {
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
  ({ rewards }: { rewards: RewardType[] }) => {
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
    rewardId: '0',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: '5,000',
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#cc0000',
  },
  {
    rewardId: '1',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: '5,000',
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#00cc00',
  },
  {
    rewardId: '2',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: '5,000',
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#0000cc',
  },
  {
    rewardId: '3',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: '5,000',
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#000000',
  },
  {
    rewardId: '4',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: '5,000',
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#cccccc',
  },
  {
    rewardId: '5',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: '5,000',
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#cc00cc',
  },
  {
    rewardId: '6',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: '5,000',
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#00cccc',
  },
  {
    rewardId: '7',
    rewardName: 'Blind Me (5 sec)',
    rewardCost: '5,000',
    pointsImage:
      'https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png',
    rewardImage:
      'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
    rewardBgColor: '#cccc00',
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
