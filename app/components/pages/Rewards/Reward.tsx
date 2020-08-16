import React from 'react';
import {
  Paper,
  Typography,
  makeStyles,
  createStyles,
  useTheme,
  Theme,
  fade,
} from '@material-ui/core';

type RewardProps = {
  rewardName: string;
  rewardCost: string;
  rewardBgColor: string;
  pointsImage: string;
  rewardImage: string;
  warn: boolean;
  scale?: number;
};

const defaultProps = {
  scale: 1,
};

const useStyles = (theme: Theme, scale: number) =>
  makeStyles(
    () =>
      createStyles({
        root: {
          flexBasis: 'calc(100% / 3)',
          padding: 'calc(5% / 3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        rewardPaper: {
          width: '100%',
          height: 0,
          paddingTop: '100%',
          position: 'relative',
        },
        rewardPaperContent: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        rewardImg: {
          marginTop: theme.spacing(3.5),
          width: theme.spacing(3.5),
          height: theme.spacing(3.5),
        },
        pointsPaper: {
          height: theme.spacing(2.5),
          padding: theme.spacing(0.5),
          marginBottom: theme.spacing(1),
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: fade('#000000', 0.35),
        },
        pointsCost: {
          marginLeft: theme.spacing(1),
          fontSize: theme.spacing(1.5),
        },
        pointsImg: {
          width: theme.spacing(1.5),
          height: theme.spacing(1.5),
        },
        label: {
          width: theme.spacing(12),
          height: theme.spacing(4),
          fontSize: theme.spacing(1.375),
          textAlign: 'center',
          backgroundColor: 'transparent',
          wordBreak: 'break-word',
        },
      }),
    { name: 'Reward' }
  );

Reward.defaultProps = defaultProps;

export default function Reward({
  rewardName,
  rewardCost,
  rewardBgColor,
  pointsImage,
  rewardImage,
  warn,
  scale = defaultProps.scale,
}: RewardProps) {
  const theme = useTheme();
  const classes = useStyles(theme, scale)();
  return (
    <div className={classes.root}>
      <Paper
        className={classes.rewardPaper}
        style={{ backgroundColor: rewardBgColor }}
      >
        <div className={classes.rewardPaperContent}>
          <img
            src={rewardImage}
            alt="Reward Icon"
            className={classes.rewardImg}
          />
          <Paper elevation={0} className={classes.pointsPaper}>
            <img src={pointsImage} alt="Points" className={classes.pointsImg} />
            <Typography className={classes.pointsCost}>{rewardCost}</Typography>
          </Paper>
        </div>
      </Paper>
      <Typography className={classes.label}>{rewardName}</Typography>
    </div>
  );
}
