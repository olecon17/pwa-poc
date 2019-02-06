import { put, takeLatest, call } from 'redux-saga/effects';

const fetchMessagesFromApi = () =>
  fetch('https://cappwa-database.herokuapp.com/api/messages').then(
    res => {
      if (!res.ok) {
        console.log('bad code');
        return false;
      }
      return res.json();
    },
    error => {
      console.log(' in err ');
      return false;
    },
  );

function* onFetchQuestions() {
  yield put({ type: 'START_LOADING' });

  const messages = yield call(fetchMessagesFromApi);

  if (messages) {
    yield put({ type: 'SET_MESSAGES', messages });
  } else {
    try {
      const cacheMessages = yield getMessagesFromCache();
      yield put({ type: 'SET_MESSAGES', messages: cacheMessages });
    } catch (error) {
      console.log('could not get from cache');
    }
  }
  yield put({ type: 'STOP_LOADING' });
}

const putModifiedOffer = (url, modifiedMsg) => {
  console.log('postmod');
  return fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(modifiedMsg), // body data type must match "Content-Type" header
  });
};

function* onAcceptOffer(action) {
  if (!action.msg.accepted) {
    yield put({ type: 'MARK_ACCEPTED', msg: action.msg });
  }
  const modifiedMsg = Object.assign({}, action.msg, { accepted: true });
  const putUrl = `https://cappwa-database.herokuapp.com/api/messages/${
    modifiedMsg.id
  }`;

  try {
    yield call(putModifiedOffer, putUrl, modifiedMsg);
    yield put({ type: 'PUT_SUCCESS' });
  } catch (err) {
    yield put({
      type: 'ADD_PENDING_ACTION',
      pending: { type: 'ACCEPT_OFFER', msg: modifiedMsg },
    });
    console.log(err);
  }
}

function* onDeclineOffer(action) {
  if (!action.msg.rejected) {
    yield put({ type: 'MARK_DECLINED', msg: action.msg });
  }
  const modifiedMsg = Object.assign({}, action.msg, { rejected: true });
  const putUrl = `https://cappwa-database.herokuapp.com/api/messages/${
    modifiedMsg.id
  }`;

  try {
    yield call(putModifiedOffer, putUrl, modifiedMsg);
    yield put({ type: 'PUT_SUCCESS' });
  } catch (err) {
    yield put({
      type: 'ADD_PENDING_ACTION',
      pending: { type: 'DECLINE_OFFER', msg: modifiedMsg },
    });
    console.log(err);
  }
}

// retry stuff

// const getPendingActions = (state) => state.get('pendingActions')
// function* emptyPendingStore() {
//   yield(put({type: 'SET_PENDING', pending: []}))
// }

// function* onConnectionRestored(action) {
//   let pendings = yield select(getPendingActions)
//   if (pendings.length > 0) {
//     yield put({ type: 'RETRY_NEXT' })
//   } else {
//     yield emptyPendingStore()
//     console.log('set store pendings empty')
//     let cachedPendings = yield getPendingsFromCache()
//     yield put({ type: 'SET_PENDING', pending: cachedPendings })
//     yield put({ type: 'RETRY_NEXT' })
//     }
// }

// function* onRetryNext() {
//   let pendings = yield select(getPendingActions)
//   if (pendings.length > 0) {
//     console.log('got pendings from store')
//     yield retryRequest(pendings[0])
//   } else  {
//     yield(put({ type: 'RETRY_EMPTY' }))
//   }
// }

// function* retryRequest(action) {
//   console.log('in retry method')
//   yield put({type: action.type, msg: action.msg})
//   yield put({type: 'RETRY_DONE', msg: action.msg})

// }

// function* onRetryDone(action) {
//   let currentPendings = yield( select(getPendingActions))
//   yield(put({ type: 'SET_PENDING', pending: currentPendings.length > 1 ? currentPendings.splice(0, 1) : [] }))
// }

function* rootSaga() {
  yield takeLatest('FETCH_MESSAGES', onFetchQuestions);
  // yield takeLatest('ADD_MESSAGE', onPostMessage);
  yield takeLatest('ACCEPT_OFFER', onAcceptOffer);
  yield takeLatest('DECLINE_OFFER', onDeclineOffer);
  // yield takeLatest('ONLINE', onConnectionRestored)
  // yield takeLatest('RETRY_NEXT', onRetryNext)
  // yield takeLatest('RETRY_DONE', onRetryDone)
}

export default rootSaga;
