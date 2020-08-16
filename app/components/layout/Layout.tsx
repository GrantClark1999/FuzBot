import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

import Navbar from './Navbar';
import SideDrawer from './SideDrawer';
import Content from './Content';

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      display: 'flex',
    },
  });
});

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <Navbar isDrawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
      <SideDrawer
        isDrawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Content>{children}</Content>
    </div>
  );
}
