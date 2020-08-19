import React, { useEffect } from 'react';
import { subscribe, unsubscribe } from './subscriber';

export default function PubSub() {
  console.log('IN PUBSUB COMPONENT');
  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, []);

  return <p>WELCOME TO PUBSUB</p>;
}