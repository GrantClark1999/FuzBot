import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(
  {
    fab: {
      color: '#ffffff',
      backgroundColor: green[600],
      '&:hover': {
        backgroundColor: green[900],
      },
    },
  },
  { name: 'Add-Button' }
);

type AddProps = {
  onClick: (...args: any[]) => void;
};

export default function Add({ onClick }: AddProps) {
  const classes = useStyles();

  return (
    <Fab classes={{ root: classes.fab }} onClick={onClick} aria-label="add">
      <AddIcon />
    </Fab>
  );
}
