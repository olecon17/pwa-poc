import { call, put, takeLatest } from 'redux-saga/effects';
import { setMessages } from '../../actions/index';

async function fetchMessages() {
  console.log('in fetch');
  const response = await fetch('http://localhost:8000/messages');
  const messages = response.json();
  return messages;
}

function* onFetchQuestions() {
  // Probably simpler?
  const messages = yield fetch('http://localhost:8000/messages') // Promise to resolve to something
    .then(res => res.json());

  yield put({ type: 'SET_MESSAGES', messages }); // This works other than the whole webpage dying horribly past this point lol
}

function* rootSaga() {
  yield takeLatest('FETCH_MESSAGES', onFetchQuestions);
}

export default rootSaga;
