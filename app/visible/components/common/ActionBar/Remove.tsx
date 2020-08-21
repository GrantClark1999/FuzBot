import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(
  {
    fab: (props: { isRemoving: boolean }) => ({
      backgroundColor: props.isRemoving ? green[600] : red[600],
      color: '#ffffff',
    }),
  },
  { name: 'Remove-Button' }
);

type RemoveProps = {
  isRemoving: boolean;
  onClick: (...args: any[]) => void;
};

export default function Remove({ isRemoving, onClick }: RemoveProps) {
  const classes = useStyles({ isRemoving });

  return (
    <Fab classes={{ root: classes.fab }} onClick={onClick} aria-label="delete">
      {!isRemoving ? <CheckIcon /> : <DeleteIcon />}
    </Fab>
  );
}
