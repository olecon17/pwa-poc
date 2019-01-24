import { messages } from '../store/initialState';

export default function(state = messages, action) {
  switch (action.type) {
    case 'OPEN_OFFER':
      console.log('open offer');
      console.log(action);
      return state;
    case 'SET_MESSAGES':
      const messageState = [...state];
      action.messages.forEach(message => {
        if (messageState[message.id]) { //update existing
          messageState[message.id] = Object.assign({}, messageState[message.id], message)
        } else { // add new
          messageState[message.id] = Object.assign({}, message)
        }
      })

      return messageState;
    default:
      return state;
  }
}
