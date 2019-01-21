import { messages } from '../store/initialState';

export default function(state = messages, action) {
  switch (action.type) {
    case 'OPEN_OFFER':
      console.log('open offer');
      console.log(action);
      return state;
    case 'SET_MESSAGES':
      const messageState = [...state];
      messageState.forEach((message, index) => {
        if (action.messages[message.id]) {
          messageState[index] = Object.assign({}, messageState[index], action.messages[message.id])
        }
      }
      });
      return messageState;
    default:
      return state;
  }
}
