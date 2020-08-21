import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(
  {
    fab: (props: { isRemoving: boolean }) => ({
      color: '#ffffff',
      backgroundColor: props.isRemoving ? red[900] : red[600],
      '&:hover': {
        backgroundColor: props.isRemoving ? red[600] : red[900],
      },
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
      {isRemoving ? <CloseIcon /> : <DeleteIcon />}
    </Fab>
  );
}
