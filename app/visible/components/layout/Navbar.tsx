import React, { useState } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  makeStyles,
  createStyles,
  useTheme,
  Theme,
} from '@material-ui/core';
import { DRAWER_WIDTH } from 'app/visible/constants/ui.json';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { selectAuthInfo } from 'app/visible/components/pages/Login/authSlice';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
  });
});

type Props = {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
};

export default function Navbar({ isDrawerOpen, handleDrawerOpen }: Props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const authData = useSelector(selectAuthInfo);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileMenuToggle = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, {
            [classes.hide]: isDrawerOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" className={classes.title}>
          FuzBot
        </Typography>
        <Avatar
          alt={authData.displayName}
          src={authData.picture}
          onClick={handleProfileMenuToggle}
        />
      </Toolbar>
    </AppBar>
  );
}
