import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RedeemIcon from '@material-ui/icons/Redeem';
import WifiIcon from '@material-ui/icons/Wifi';
import ScheduleIcon from '@material-ui/icons/Schedule';
import routes from 'app/visible/constants/routes.json';
import classes from './DrawerItems.css';

const items = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    route: routes.DEFAULT,
  },
  {
    label: 'Channel Rewards',
    icon: <RedeemIcon />,
    route: routes.REWARDS,
  },
  {
    label: 'Devices',
    icon: <WifiIcon />,
    route: routes.DEVICES,
  },
  {
    label: 'Actions',
    icon: <ScheduleIcon />,
    route: routes.ACTIONS,
  },
];

export default function DrawerItems() {
  return (
    <List>
      {items.map(({ label, icon, route }) => (
        <ListItem
          button
          component={NavLink}
          to={route}
          activeClassName={classes.activeLink}
          key={label}
          exact
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );
}
