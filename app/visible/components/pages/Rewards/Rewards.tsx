import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { RewardDoc, RedemptionDoc } from '../../../../../db/types';
import Reward from './Reward/Reward';
import {
  selectRewardList,
  addReward,
  removeReward,
  updateRewardList,
} from './rewardsSlice';
import AddRewardDialog from './AddRewardDialog/AddRewardDialog';
import classes from './Rewards.css';
import ActionBar from '../../common/ActionBar/ActionBar';

type SortableRewardItemProps = {
  reward: RewardDoc;
  canRemove: boolean;
  handleRemove: () => void;
};

const SortableRewardItem = SortableElement(
  ({ reward, canRemove, handleRemove }: SortableRewardItemProps) => {
    const { rewardName, rewardCost, rewardImage, rewardBgColor } = reward;
    return (
      <div className={classes.reward}>
        <Reward
          rewardName={rewardName}
          rewardCost={rewardCost}
          rewardImage={rewardImage}
          rewardBgColor={rewardBgColor}
          canRemove={canRemove}
          handleRemove={handleRemove}
        />
      </div>
    );
  }
);

type SortableRewardListProps = {
  rewards: RewardDoc[];
  canRemove: boolean;
  handleRemove: (index: number) => void;
};

const SortableRewardList = SortableContainer(
  ({ rewards, canRemove, handleRemove }: SortableRewardListProps) => {
    return (
      <div className={classes.rewards}>
        {rewards.map((reward, index) => (
          <SortableRewardItem
            key={`reward-${reward.rewardId}`}
            index={index}
            reward={reward}
            disabled={canRemove}
            canRemove={canRemove}
            handleRemove={() => handleRemove(index)}
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
    rewardImage="https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
    rewardBgColor="#9d50bb"
  />
);

export default function Rewards() {
  const dispatch = useDispatch();

  // Redux State (interacts with database via IPC)
  const rewardList = useSelector(selectRewardList);

  // Local State
  const [validRedemption, setValidRedemption] = useState<RedemptionDoc>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [canRemove, setCanRemove] = useState(false);

  // Functions for handling modifications to the rewardList

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    if (oldIndex === newIndex) return;
    const newList = arrayMove(rewardList, oldIndex, newIndex);
    dispatch(updateRewardList(newList));
  }

  function toggleCanRemove() {
    setCanRemove(!canRemove);
  }

  function handleRemoveReward(index: number) {
    dispatch(removeReward(index));
  }

  // Functions for handling state changes on Dialog interaction.

  function handleDialogOpen() {
    setIsDialogOpen(true);
    ipcRenderer.send('subscribe');
    ipcRenderer.on('redemption', (_event, lastRedemption: RedemptionDoc) => {
      const { redemption } = lastRedemption.data;
      if (redemption.user.id === redemption.channel_id) {
        setValidRedemption(lastRedemption);
        setCanSave(true);
      }
    });
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

  function renderDialogReward(doc: RedemptionDoc) {
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
      {/* <Button variant="contained" color="secondary" onClick={handleDialogOpen}>
        Add Reward
      </Button>
      <Button variant="contained" color="secondary" onClick={toggleCanRemove}>
        Remove Rewards
      </Button> */}
      <ActionBar
        handleAdd={handleDialogOpen}
        handleRemove={toggleCanRemove}
        isRemoving={canRemove}
      />
      <AddRewardDialog
        open={isDialogOpen}
        canSave={canSave}
        handleClose={handleDialogClose}
        handleSave={handleSaveReward}
      >
        {validRedemption ? renderDialogReward(validRedemption) : defaultReward}
      </AddRewardDialog>
      <SortableRewardList
        rewards={rewardList}
        onSortEnd={onSortEnd}
        axis="xy"
        canRemove={canRemove}
        handleRemove={handleRemoveReward}
      />
    </>
  );
}
