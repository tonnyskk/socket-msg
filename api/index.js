const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const helmet = require('helmet');
const moment = require('moment');

const port = process.env.PORT || 3001;

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use(helmet());

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  res.status(200).send(currentTime);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
