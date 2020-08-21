import React from 'react';
import {
  Typography,
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
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
  title?: string;
  handleAdd?: (...args: any[]) => void;
  handleRemove?: (...args: any[]) => void;
  isRemoving?: boolean;
};

const defaultProps = {
  title: '',
  handleAdd: undefined,
  handleRemove: undefined,
  isRemoving: false,
};

ActionBar.defaultProps = defaultProps;

export default function ActionBar({
  title = defaultProps.title,
  handleAdd,
  handleRemove,
  isRemoving = defaultProps.isRemoving,
}: ActionBarProps) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Typography variant="h3" style={{ flexGrow: 1 }}>
        {title}
      </Typography>
      {handleAdd ? <Add onClick={handleAdd} /> : null}
      {handleRemove ? (
        <Remove isRemoving={isRemoving} onClick={handleRemove} />
      ) : null}
    </div>
  );
}
