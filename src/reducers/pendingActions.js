import { pendingActions } from '../store/initialState';
import CacheManager from './CacheManager';
const cache = new CacheManager();

export default function(state = pendingActions, action) {
  switch (action.type) {
    case 'ADD_PENDING_ACTION':
      const newAction = action.pending;
      // console.group('pending')
      // console.log(action.pending)
      const newPendings = [...state, newAction];
      // console.log(newPendings)
      // console.groupEnd('pending')

      cache
        .writeData('pendingActions', newPendings)
        .then(cache => console.log(`new cache: ${cache}`))
        .catch(err => {
          console.log(`could not write to cache cause of ${err}`);
          console.log('will lose store if navigting away');
        });
      return newPendings; // return old state to test cache
    case 'SET_PENDING':
      if (action.pending) {
        const newPending = action.pending;
        return newPending;
      }
      return [];

    default:
      return state;
  }
}
