const express = require('express');
const helmet = require('helmet');
const moment = require('moment');
const socket = require('socket.io');

const app = express();

const io = socket(app);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', '[DEFAULT]' + msg);
  });
});

app.use(helmet());

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  res.status(200).send(currentTime);
});

module.exports = app;
