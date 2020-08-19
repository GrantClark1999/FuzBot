import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Button } from '@material-ui/core';
import { RewardDoc, RedemptionDoc } from '../../../../db/types';
import Reward from './Reward/Reward';
import { selectRewardList, addReward, updateRewardOrder } from './rewardsSlice';
import AddRewardDialog from './AddRewardDialog/AddRewardDialog';
import classes from './Rewards.css';
import { selectRedemption } from '../PubSub/pubsubSlice';

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

const defaultReward = (
  <Reward
    rewardName="Your Reward Here"
    rewardCost="Cost"
    pointsImage="https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png"
    rewardImage="https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
    rewardBgColor="#9d50bb"
  />
);

export default function Rewards() {
  const dispatch = useDispatch();

  // Redux State (interacts with database via IPC)
  const rewardList = useSelector(selectRewardList);
  const lastRedemption = useSelector(selectRedemption);

  // Local State
  const [validRedemption, setValidRedemption] = useState<RedemptionDoc>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (lastRedemption) {
      const { redemption } = lastRedemption.data;
      if (redemption.user.id === redemption.channel_id) {
        setValidRedemption(lastRedemption);
      }
    }
  }, [lastRedemption]);

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    const newOrder = arrayMove(rewardList, oldIndex, newIndex);
    dispatch(updateRewardOrder(newOrder));
  }

  function handleDialogOpen() {
    setIsDialogOpen(true);
    ipcRenderer.send('subscribe');
  }

  function handleDialogClose() {
    ipcRenderer.removeAllListeners('redemption');
    ipcRenderer.send('unsubscribe');
    setIsDialogOpen(false);
    setValidRedemption(undefined);
    setCanSave(false);
  }

  function handleSaveReward() {
    if (validRedemption) {
      dispatch(addReward(validRedemption));
    }
    handleDialogClose();
  }

  function renderReward(doc: RedemptionDoc) {
    const { reward } = doc.data.redemption;
    return (
      <Reward
        rewardName={reward.title}
        rewardCost={reward.cost}
        rewardImage={reward.image?.url_4x ?? reward.default_image.url_4x}
        rewardBgColor={reward.background_color}
      />
    );
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleDialogOpen}>
        Add Reward
      </Button>
      <AddRewardDialog
        open={isDialogOpen}
        canSave={canSave}
        handleClose={handleDialogClose}
        handleSave={handleSaveReward}
      >
        {validRedemption ? renderReward(validRedemption) : defaultReward}
      </AddRewardDialog>
      <SortableRewardList
        rewards={rewardList}
        onSortEnd={onSortEnd}
        axis="xy"
      />
    </>
  );
}
