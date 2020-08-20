import actions from './collections/actions';
import channels from './collections/channels';
import devices from './collections/devices';
import points from './collections/points';
import redemptions from './collections/redemptions';
import rewards from './collections/rewards';
import users from './collections/users';

export function loadDb() {
  actions.load();
  channels.load();
  devices.load();
  points.load();
  redemptions.load();
  rewards.load();
  users.load();
}

export default {
  loadDb,
  actions,
  channels,
  devices,
  points,
  redemptions,
  rewards,
  users,
};
