import React from 'react';
import { Paper } from '@material-ui/core';
import DynamicFontSize from 'components/common/DynamicFontSize/DynamicFontSize';
import SquarePaper from 'components/common/SquarePaper/SquarePaper';
import { RewardDoc } from '../../../../db/types';
import classes from './Reward.css';

type RewardProps = Omit<
  RewardDoc,
  '_id' | 'rewardId' | 'isQueued' | 'position' | 'warn'
>;

export default function Reward({
  rewardName,
  rewardCost,
  rewardBgColor,
  pointsImage,
  rewardImage,
}: RewardProps) {
  return (
    <DynamicFontSize ratio={11 / 103} style={{ padding: '0.5em' }}>
      <Paper elevation={4} className={classes['reward-item']}>
        <SquarePaper style={{ backgroundColor: rewardBgColor }}>
          <img
            src={rewardImage}
            alt="Reward Icon"
            className={classes['reward-icon__image']}
          />
          <Paper elevation={2} className={classes['reward-icon__cost']}>
            <img
              src={pointsImage}
              alt="Points Icon"
              className={classes['reward-icon__cost__image']}
            />
            <p className={classes['reward-icon__cost__text']}>{rewardCost}</p>
          </Paper>
        </SquarePaper>
        <p className={classes['reward-label']}>{rewardName}</p>
      </Paper>
    </DynamicFontSize>
  );
}
