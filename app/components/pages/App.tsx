import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, lightBlue } from '@material-ui/core/colors';
import routes from 'constants/routes.json';
import Layout from 'components/layout/Layout';
import Login from './Login/Login';
import Home from './Home/Home';
import PubSub from './PubSub/PubSub';
import Rewards from './Rewards/Rewards';
import { selectIsAuth } from './Login/authSlice';

export default function App() {
  const isAuth = useSelector(selectIsAuth);

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            main: deepPurple[400],
          },
          secondary: {
            main: lightBlue[200],
          },
        },
      }),
    []
  );

  const loginRoutes = <Route path={routes.DEFAULT} component={Login} />;
  const authRoutes = (
    <Layout>
      <Switch>
        <Route exact path={routes.PUBSUB} component={PubSub} />
        <Route exact path={routes.REWARDS} component={Rewards} />
        <Route path={routes.DEFAULT} component={Home} />
      </Switch>
    </Layout>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuth ? authRoutes : loginRoutes}
    </ThemeProvider>
  );
}
