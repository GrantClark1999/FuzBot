import React from 'react';
import { Zoom, useTheme, Fab, makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
  root: {
    lineHeight: 0,
    fontSize: '2.5em',
    width: '1em',
    height: '1em',
    minHeight: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});

type DeleteableProps = {
  enable?: boolean;
  onClick?: () => void;
};

const defaultProps = {
  enable: false,
  onClick: () => {},
};

Deleteable.defaultProps = defaultProps;

export default function Deleteable({ enable, onClick }: DeleteableProps) {
  const theme = useTheme();
  const classes = useStyles();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom in={enable} timeout={transitionDuration} unmountOnExit>
      <Fab classes={{ root: classes.root }} onClick={onClick}>
        <CancelIcon color="error" fontSize="inherit" />
      </Fab>
    </Zoom>
  );
}
