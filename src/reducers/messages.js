import { messages } from '../store/initialState';
import CacheManager from './CacheManager'

const cache = new CacheManager()

const getPendingActions = (state) => state.get('pendingActions')

const addOrReplace = (array, item) => {
  const i = array.findIndex(_item => _item.id === item.id);
  if (i > -1) array[i] = item;
  else array.push(item);
}


export default function(state = messages, action) {
  let messageState = []
  switch (action.type) {
    case 'MARK_ACCEPTED':
    case 'MARK_DECLINED':
      messageState = state;
      let modifiedMessage = action.type == 'MARK_ACCEPTED' ?  Object.assign({}, action.msg, {accepted: true}) : Object.assign({}, action.msg, {rejected: true})
      let messageIndex = messageState.findIndex(stateMsg => stateMsg.id == action.msg.id)
      messageState[messageIndex] = modifiedMessage

      cache.writeData('messages', messageState)
      return messageState;

    case 'SET_MESSAGES':
      if (!action.messages) {
        console.log('something wrong with action msgs,  returning same state')
        return state
      }
      messageState = state;
      action.messages.forEach(newMessage => {
        addOrReplace(messageState, newMessage)
      })
      cache.writeData('messages', messageState)

      return messageState;
    default:
      return state;
  }
}
