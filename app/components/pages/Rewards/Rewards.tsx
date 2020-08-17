import React from 'react';
import { Paper, makeStyles, createStyles } from '@material-ui/core';
import Reward from './Reward';

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  });
});

export default function Rewards() {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.root}>
      <Reward
        rewardName="Blind Me (5 sec)"
        rewardCost="100,000"
        pointsImage="https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png"
        rewardImage="https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
        rewardBgColor="#cc0000"
      />
      <Reward
        rewardName="END THE STREAM"
        rewardCost="20,000,000"
        pointsImage="https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png"
        rewardImage="https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
        rewardBgColor="#cc0000"
      />
      <Reward
        rewardName="Some Really Long Channel Reward Name"
        rewardCost="5,000,000"
        pointsImage="https://static-cdn.jtvnw.net/channel-points-icons/82521150/a1d00694-ee60-43ad-a336-42f68730d88f/icon-4.png"
        rewardImage="https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
        rewardBgColor="#cc0000"
      />
    </Paper>
  );
}
