// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js',
// );

console.log('afger import')
self.addEventListener('install', event => {
  console.log('service worker installing...');
});

self.addEventListener('activate', event => {
  console.log('service worker activated');
});

// self.addEventListener('notificationclick', function(event) {
//   console.log('[Service Worker] Notification click Received.');

//   event.notification.close();

//   event.waitUntil(
//     self.clients.openWindow('https://192.168.208.248:8081')
//   );
// });

// self.addEventListener('fetch', event => {
//   const url = new URL(event.request.url)

//   console.log('Fetching from ' + url)
// })

self.addEventListener('push', event => {
  const title = 'Cappex';
  const options = {
    body: event.data.text(),
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('sync', event => {
  if (event.tag === 'msg-post') {
    event.waitUntil(postNewMessage());
  }
});

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);

//   workbox.setConfig({
//     debug: true,
//   });
//   workbox.skipWaiting();
//   workbox.clientsClaim();

//   workbox.precaching.precacheAndRoute(self.__precacheManifest);

//   workbox.routing.registerRoute(
//     /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//     workbox.strategies.cacheFirst({
//       cacheName: 'fonts',
//       plugins: [
//         new workbox.expiration.Plugin({
//           maxEntries: 50,
//         }),
//       ],
//     }),
//   );
//   workbox.routing.registerRoute(
//     new RegExp('https://cappwa-database.herokuapp.com/api/messages'),
//     workbox.strategies.networkFirst({
//       cacheName: 'message-cache',
//       plugins: [
//         new workbox.cacheableResponse.Plugin({
//           statuses: [0, 200],
//         }),
//       ],
//     }),
//   );

//   console.log('after reg fonts');
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }

const extraMessages = [
  {
    toUser: 'Conor',
    fromUser: 'zach',
    campaign: 'camp1',
    college: 'Generic Message',
    subject: 'Learn some stuff at our school',
    text: 'Buy now and save!',
    open: false,
    accepted: false,
    rejected: false,
  },

  {
    toUser: 'Mitch',
    fromUser: 'conor',
    campaign: 'school',
    college: 'Cornell College',
    subject: 'The best school in the Corn League',
    text: "It's like being at an Ivy, but with corn instead.",
    open: false,
    accepted: false,
    rejected: false,
  },
  {
    toUser: 'Conor',
    fromUser: 'conor',
    campaign: 'Upheonix',
    college: 'Pheonix University',
    subject: 'Rise from the ashes',
    text: 'Accept for immortality',
    open: false,
    accepted: false,
    rejected: false,
  },
];

function postNewMessage() {
  const randomMessage =
    extraMessages[Math.floor(Math.random() * extraMessages.length)];

  fetch('https://cappwa-database.herokuapp.com/push', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(randomMessage), // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}


