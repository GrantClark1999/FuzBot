import React, { useRef } from 'react';
import { Paper } from '@material-ui/core';
import useResize from 'components/common/useResize';
import classes from './Reward.css';

type RewardProps = {
  rewardName: string;
  rewardCost: string;
  rewardBgColor: string;
  pointsImage: string;
  rewardImage: string;
  numRewards?: number;
};

const defaultProps = {
  numRewards: 6,
};

Reward.defaultProps = defaultProps;

export default function Reward({
  rewardName,
  rewardCost,
  rewardBgColor,
  pointsImage,
  rewardImage,
  numRewards = defaultProps.numRewards,
}: RewardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useResize(ref);

  let fontSize = 11;
  let currencySize = 12;
  if (size !== 0) {
    fontSize = (11 / 103) * (size - 1);
    currencySize = (12 / 103) * (size - 1);
  }

  return (
    <Paper
      elevation={7}
      className={classes.reward}
      style={{
        flexBasis: `calc(100% / ${numRewards})`,
        fontSize: `${fontSize}px`,
      }}
      ref={ref}
    >
      <Paper
        className={classes['reward-icon-background']}
        style={{
          backgroundColor: rewardBgColor,
        }}
      >
        <div className={classes['reward-icon']}>
          <img
            src={rewardImage}
            alt="Reward Icon"
            className={classes['reward-icon__image']}
          />
          <Paper elevation={2} square className={classes['reward-icon__cost']}>
            <img
              src={pointsImage}
              alt="Points Icon"
              style={{
                width: `${currencySize}px`,
                height: `${currencySize}px`,
                marginRight: `${0.5 * fontSize}px`,
              }}
            />
            <p className={classes['reward-icon__cost__text']}>{rewardCost}</p>
          </Paper>
        </div>
      </Paper>
      <p className={classes['reward-label']}>{rewardName}</p>
    </Paper>
  );
}
