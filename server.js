const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const webPush = require('web-push');

let pushSubscription = {};
const vapidPublicKey =
  'BJaAknbSmqQYQTm2hhC0_jTnO7JiWBwWLARzeI_R3-M3ahwsUJRzU4cAW2UhSQFDtqZ-asPVk76QWFiDERzQZQs';
const vapidPrivateKey = 'NIjeudt9zWy_S3jKhUmWqee_ycB-MmyIwBYt3DYnrL0';

const notificationText = 'New messages are available! Please refresh the page';

const isValidSaveRequest = (req, res) => {
  // Check the request body has at least an endpoint.
  if (!req.body || !req.body.endpoint) {
    // Not a valid subscription.
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send(
      JSON.stringify({
        error: {
          id: 'no-endpoint',
          message: 'Subscription must have an endpoint.',
        },
      }),
    );
    return false;
  }
  return true;
};

const options = {
  // gcmAPIKey: 'YOUR_SERVER_KEY',
  TTL: 60,
  vapidDetails: {
    subject: 'mailto:coleary@cappex.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey,
  },
};

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/subscribe', (req, res) => {
  if (isValidSaveRequest(req, res)) {
    pushSubscription = req.body;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ data: { success: true } }));
  }
});

server.post('/push', (req, res, next) => {
  console.log('got post, sending notification');
  webPush
    .sendNotification(pushSubscription, notificationText, options)
    .then((resolve, reject) => {
      if (req.body) {
        req.url = '/api/messages';
        server.handle(req, res);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

server.use('/api', router); // Rewrite routes to appear after /api

server.listen(8000, () => {
  console.log('JSON Server is running');
});

// Public Key:
// BM5EbkFW3E2J8esMfl4tvekBbG9T0uNBztd0sZieaj_1e87QCLkfWhrNrgUS6kCYqIO4R6FVmXOgGonyVG7l_DA

// Private Key:
// 2VFX6jAD6lpSlZ1iOd0FzRRqfcLgTUiG9KYxELRoA50
