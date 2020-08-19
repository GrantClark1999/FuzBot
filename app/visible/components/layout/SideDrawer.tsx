import React from 'react';
import clsx from 'clsx';
import {
  Drawer,
  makeStyles,
  createStyles,
  useTheme,
  Theme,
  Divider,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DRAWER_WIDTH } from 'app/visible/constants/ui.json';
import DrawerItems from './DrawerItems';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
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
  isDrawerOpen: boolean;
  handleDrawerClose: () => void;
};

export default function SideDrawer({ isDrawerOpen, handleDrawerClose }: Props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isDrawerOpen,
        [classes.drawerClose]: !isDrawerOpen,
      })}
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <DrawerItems />
    </Drawer>
  );
}
