import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import PubSub from './components/PubSub/PubSub';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AppContainer>
      <PubSub />
    </AppContainer>,
    document.getElementById('root')
  );
});
