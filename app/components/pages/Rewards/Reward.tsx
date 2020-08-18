import React from 'react';
import { Paper } from '@material-ui/core';
import DynamicFontSize from 'components/common/DynamicFontSize/DynamicFontSize';
import classes from './Reward.css';

type RewardProps = {
  rewardName: string;
  rewardCost: string;
  rewardBgColor: string;
  pointsImage: string;
  rewardImage: string;
};

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
        <Paper
          className={classes['reward-icon-background']}
          style={{ backgroundColor: rewardBgColor }}
        >
          <div className={classes['reward-icon']}>
            <img
              src={rewardImage}
              alt="Reward Icon"
              className={classes['reward-icon__image']}
            />
            <Paper
              elevation={2}
              square
              className={classes['reward-icon__cost']}
            >
              <img
                src={pointsImage}
                alt="Points Icon"
                className={classes['reward-icon__cost__image']}
              />
              <p className={classes['reward-icon__cost__text']}>{rewardCost}</p>
            </Paper>
          </div>
        </Paper>
        <p className={classes['reward-label']}>{rewardName}</p>
      </Paper>
    </DynamicFontSize>
  );
}
