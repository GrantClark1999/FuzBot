import React from 'react';
import { Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import DynamicFontSize from 'app/visible/components/common/DynamicFontSize/DynamicFontSize';
import SquarePaper from 'app/visible/components/common/SquarePaper/SquarePaper';
import { RewardDoc } from '../../../../../../db/types';
import { selectPointsImage } from '../rewardsSlice';
import classes from './Reward.css';

type RewardProps = Omit<
  RewardDoc,
  '_id' | 'rewardId' | 'rewardCost' | 'isQueued' | 'position' | 'warn'
> & { rewardCost: number | string };

function transformCost(cost: number | string) {
  if (typeof cost === 'string') return cost;
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const svg = (
  <svg className={classes['reward-icon__cost__image']} viewBox="0 0 20 20">
    <g>
      <path d="M10 6a4 4 0 014 4h-2a2 2 0 00-2-2V6z" />
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z"
      />
    </g>
  </svg>
);

export default function Reward({
  rewardName,
  rewardCost,
  rewardBgColor,
  rewardImage,
}: RewardProps) {
  const pointsImage = useSelector(selectPointsImage);
  return (
    <DynamicFontSize ratio={11 / 117} style={{ padding: '0.5em' }}>
      <Paper elevation={4} className={classes['reward-item']}>
        <SquarePaper style={{ backgroundColor: rewardBgColor }}>
          <img
            src={rewardImage}
            alt="Reward Icon"
            className={classes['reward-icon__image']}
          />
          <Paper elevation={2} className={classes['reward-icon__cost']}>
            {pointsImage ? (
              <img
                src={pointsImage}
                alt="Points Coin"
                className={classes['reward-icon__cost__image']}
              />
            ) : (
              svg
            )}
            <p className={classes['reward-icon__cost__text']}>
              {transformCost(rewardCost)}
            </p>
          </Paper>
        </SquarePaper>
        <p className={classes['reward-label']}>{rewardName}</p>
      </Paper>
    </DynamicFontSize>
  );
}
