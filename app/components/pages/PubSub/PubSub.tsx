import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';
import { setRedemption, clearRedemption } from './pubsubSlice';

export default function PubSub() {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('redemption', (_event, redemption) => {
      dispatch(setRedemption(redemption));
    });
    return () => {
      dispatch(clearRedemption());
      ipcRenderer.send('unsubscribe');
    };
  }, [dispatch]);

  return <div />;
}
