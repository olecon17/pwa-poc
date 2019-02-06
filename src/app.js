/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from './utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from './containers/App/index';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Bootstrap
import './styles/custom.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import 'bootstrap/dist/js/bootstrap.js';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

render();


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = self.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscriptionToServer(subscription) {

  console.log(subscription)
  return fetch('https://cappwa-database.herokuapp.com/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }

    return response.json();
  })
  .then(function(responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server.');
    }
  });
}

function isOnline () {

  if (navigator.onLine){
    console.log('You are currently online!')
  } else {
    console.log('You are currently offline. Any requests made will be queued and synced as soon as you are connected again.')
  }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);
isOnline();


const subscribeOptions = {
  userVisibleOnly: true,
  applicationServerKey: urlB64ToUint8Array('BJaAknbSmqQYQTm2hhC0_jTnO7JiWBwWLARzeI_R3-M3ahwsUJRzU4cAW2UhSQFDtqZ-asPVk76QWFiDERzQZQs')
};

if ('serviceWorker' in navigator) {
  console.log('sw in nav')
  window.addEventListener('load', () => {
    console.log('did load event')
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('registered service worker: ', registration);
        document.getElementById('add-msg').addEventListener('click', () => {
          registration.sync.register('msg-post').then(() => {
            console.log('registered sync')
          })
        })
        return registration.pushManager.subscribe(subscribeOptions)
      })
      .then(subscription => {
        sendSubscriptionToServer(subscription)
      })
      .catch(regError => {
        console.warn(regError);
      });
  })
}


Notification.requestPermission(status => {
  console.log('Notification permission status:', status);
  if (status == 'granted') {
    // subscribeUser()
    console.log('permission granted')
  } else {
    console.log('notifcation permission not granted... wtf')
  }
});

