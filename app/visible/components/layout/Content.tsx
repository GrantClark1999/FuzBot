import React from 'react';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  });
});

type Props = {
  children: React.ReactNode;
};

export default function Content({ children }: Props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
}
