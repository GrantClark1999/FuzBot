import loadActions from './collections/actions';
import { loadChannels } from './collections/channels';
import loadDevices from './collections/devices';
import loadRedemptions from './collections/redemptions';
import loadRewards from './collections/rewards';
import loadUsers from './collections/users';

export default function load() {
  loadActions();
  loadChannels();
  loadDevices();
  loadRedemptions();
  loadRewards();
  loadUsers();
}
