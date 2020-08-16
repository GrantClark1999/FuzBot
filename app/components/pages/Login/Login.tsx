import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import styles from './Login.css';
import createLoginWindow from './window';

export default function Login(): JSX.Element {
  const iconTwitch = <i className="fab fa-twitch" />;

  return (
    <Grid
      className={styles.container}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography className={styles.welcome} variant="h1" color="textPrimary">
          Welcome
        </Typography>
      </Grid>
      <Grid item>
        <Button
          className={styles.login}
          startIcon={iconTwitch}
          variant="contained"
          color="primary"
          size="large"
          onClick={createLoginWindow}
        >
          Login With Twitch
        </Button>
      </Grid>
    </Grid>
  );
}
