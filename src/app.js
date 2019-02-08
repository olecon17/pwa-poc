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
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
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
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
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
  console.log(subscription);
  return fetch('https://cappwa-database.herokuapp.com/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }

      return response.json();
    })
    .then(responseData => {
      if (!(responseData.data && responseData.data.success)) {
        throw new Error('Bad response from server.');
      }
    });
}

function isOnline() {
  if (navigator.onLine) {
    console.log('You are currently online!');
  } else {
    console.log(
      'You are currently offline. Any requests made will be queued and synced as soon as you are connected again.',
    );
  }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);
isOnline();

const checkSupport = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!')
  }
  if (!('PushManager' in window)) {
    throw new Error('No Push API Support!')
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('stuff suppoerted and ready to rock')
  }
}

const  registerServiceWorker = async () => {
  console.log('registeeeeeering sw')
  const swRegistration = await navigator.serviceWorker.register('sw.js')
    .then( registration => {
      console.log(registration)
      console.log('registered sw')
      return registration
    })
    .catch( err => {
      console.log('Error: ' + err)
    })

  return swRegistration
}

const subscribeNotifications = async (registration) => {
  console.log('subscribing...')
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(
      'BJaAknbSmqQYQTm2hhC0_jTnO7JiWBwWLARzeI_R3-M3ahwsUJRzU4cAW2UhSQFDtqZ-asPVk76QWFiDERzQZQs',
    ),
  };

  const pushSubscription = await registration.pushManager.subscribe(subscribeOptions)

  console.log('subscribed!')
  if (pushSubscription) {
    console.log('sending to server...')
    sendSubscriptionToServer(pushSubscription)
  }
}


const serviceWorkerMain = async () => {
  checkSupport()
  const swRegistration = await registerServiceWorker()
  const notificationPermission = await requestNotificationPermission()
  if (swRegistration && notificationPermission === 'granted') {
    console.log('worker installed & permission ok')
    const notifcationSubscription = await subscribeNotifications(swRegistration)
  }
  showLocalNotification('Conor', 'is the best', swRegistration)
}

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
      body,
      // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
}


const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
  } else {
    console.log('notifcation permission not granted... wtf');
  }
}

window.addEventListener('load', () => {
  console.log('load event')
  serviceWorkerMain();
})


