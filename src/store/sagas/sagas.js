import { put, takeLatest } from 'redux-saga/effects';
import extraMessages from '../moreMessages'

function* onFetchQuestions() {
  // Probably simpler?
  const messages = yield fetch('http://localhost:8000/api/messages') // Promise to resolve to something
    .then(res => res.json());

  yield put({ type: 'SET_MESSAGES', messages }); // This works other than the whole webpage dying horribly past this point lol
}

function* onPostMessage() {

  const randomMessage = extraMessages[Math.floor(Math.random()*extraMessages.length)];

  console.log(randomMessage);
  yield* fetch('http://localhost:8000/api/messages', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(randomMessage), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    yield put({type: 'FETCH_MESSAGES'})
  }




function* rootSaga() {
  yield takeLatest('FETCH_MESSAGES', onFetchQuestions);
  yield takeLatest('ADD_MESSAGE', onPostMessage);
}

export default rootSaga
