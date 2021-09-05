const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

io.on('connection', (socket) => {
	console.log('connected')
	socket.on('press', (msg) => {
		io.emit('press', msg);
		console.log('a user pressed');
	});
});

// io.on('press', (socket) => {
	
// });

server.listen(3000, () => {
  console.log('listening on *:3000');
});