import React from 'react';
import { Theme, useTheme, makeStyles, createStyles } from '@material-ui/core';
import Add from './Add';
import Remove from './Remove';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& > *': {
        margin: theme.spacing(1),
        marginTop: 0,
      },
    },
  })
);

type ActionBarProps = {
  handleAdd?: (...args: any[]) => void;
  handleRemove?: (...args: any[]) => void;
  isRemoving?: boolean;
};

const defaultProps = {
  handleAdd: undefined,
  handleRemove: undefined,
  isRemoving: false,
};

ActionBar.defaultProps = defaultProps;

export default function ActionBar({
  handleAdd,
  handleRemove,
  isRemoving = defaultProps.isRemoving,
}: ActionBarProps) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      {handleAdd ? <Add onClick={handleAdd} /> : null}
      {handleRemove ? (
        <Remove isRemoving={isRemoving} onClick={handleRemove} />
      ) : null}
    </div>
  );
}
