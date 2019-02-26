import { put, takeLatest, call, take, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'



const makeConnectivityChannel = () =>
  eventChannel(emitter => {
    // Expose online status to watcher
    const online = () => emitter(true)
    const offline = () => emitter(false)

    window.addEventListener('online', online)
    window.addEventListener('offline', offline)

    // Unsubscribe
    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
    }
  })

const connectivityChannel = makeConnectivityChannel()


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

const getPendingActions = (state) => state.get('pendingActions')

function* onConnectionRestored(action) {
  let pendings = yield select(getPendingActions)
  if (pendings.length > 0) {
    yield put({ type: 'RETRY_NEXT' })
  } else yield put({ type: 'RETRY_EMPTY'})
}

function* onRetryNext() {
  let pendings = yield select(getPendingActions)
  console.log('# pendings: ' + pendings.length)

  if (pendings.length > 0) {
    console.log('got pendings from store')
    console.log(pendings[0])
    yield retryRequest(pendings[0])
  } else  {
    console.log('done w retires')
    yield(put({ type: 'RETRY_EMPTY' }))
  }
}

function* retryRequest(action) {
  console.group('retryRequest')
  console.log(action)
  console.groupEnd('retryRequest')
  yield put({type: action.type, msg: action.msg})
  yield put({type: 'RETRY_DONE', msg: action.msg})

}

function* onRetryDone(action) {
  let currentPendings = yield( select(getPendingActions))
  console.group('retryDone')
  console.log('pendings')
  console.log(currentPendings)
  console.log('after slice: ')
  console.log(currentPendings.slice(1))
  console.groupEnd('retryDone')
  yield(put({ type: 'SET_PENDING', pending: currentPendings.length > 1 ? currentPendings.slice(1) : [] }))
  yield(put({ type: 'RETRY_NEXT' }))
}

function* rootSaga() {
  yield takeLatest('FETCH_MESSAGES', onFetchQuestions);
  // yield takeLatest('ADD_MESSAGE', onPostMessage);
  yield takeLatest('ACCEPT_OFFER', onAcceptOffer);
  yield takeLatest('DECLINE_OFFER', onDeclineOffer);
  yield takeLatest('ONLINE', onConnectionRestored)
  yield takeLatest('RETRY_NEXT', onRetryNext)
  yield takeLatest('RETRY_DONE', onRetryDone)

  while (true) {
    const online = yield take(connectivityChannel)
    yield put({ type: online ? 'ONLINE' : 'OFFLINE' })
  }
}

export default rootSaga;
