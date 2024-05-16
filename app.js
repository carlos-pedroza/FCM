const express = require('express');
var admin = require('firebase-admin');
const app = express();
const port = 3000;

app.use(express.json());

// change for you own firebase project keys
//var serviceAccount = require('./salud-inteligente-5fba8-firebase-adminsdk-e0b8k-500341a4b4.json');
var serviceAccount = require('./google_project_keys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/sendNotification', (req, res) => {
    let message = {
        token: req.body.message.token,
        notification: {
            body: req.body.message.notification.body,
            title: req.body.message.notification.title
        },
        data: req.body.message.data
    };
    console.log(message);

    console.log('Sending notification:', message);
    admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      res.status(500).send('Error sending message');
    });
});

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en http://localhost:${port}`);
});