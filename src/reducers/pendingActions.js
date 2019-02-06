import { pendingActions } from '../store/initialState'
import CacheManager from './CacheManager'
const cache = new CacheManager()

export default function (state = pendingActions, action) {
  switch(action.type) {
    case 'ADD_PENDING_ACTION':
      let newAction = action.pending
      // console.group('pending')
      // console.log(action.pending)
      let newPendings = [...state, newAction]
      // console.log(newPendings)
      // console.groupEnd('pending')

      cache.writeData('pendingActions', newPendings).then(
        cache => console.log('new cache: ' + cache)
      ).catch(err => {
        console.log('could not write to cache cause of ' + err)
        console.log('will lose store if navigting away')
      })
      return newPendings// return old state to test cache
    case 'SET_PENDING':
      if (action.pending) {
        let newPending = action.pending
        return newPending
      } else {
        return []
      }
    default:
      return state
  }
}
