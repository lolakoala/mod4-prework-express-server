const express = require('express');
const app = express();
const sunset = require('./sunset.jpeg');
const stuff = require('./datastuff.js');
const path = require('path');

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  // We don't need to explicitly use this handler or send a response
  // because Express is using the default path of the static assets
  // to serve this content
});

app.get('/json', urlLogger, timeLogger, (request, response) => {
  response.send(stuff);
});

app.get('/sunset', (request, response) => {
  response.send(sunset);
});

app.listen(3000, () => {
  console.log('Express Intro running on localhost:3000');
});
