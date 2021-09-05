const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

const q = [];
const oq = []

let count = 0;

io.on('connection', (socket) => {
	socket.on('press', (msg) => {
		// if (q[0].id == msg.id) {
			io.emit('press', msg);
		// }
	});

  socket.on('newPlayer', (data) => {
q.push(data)
console.log(q)
io.emit('status', q);
if(q.length == 1){
  //do something
}
	});

	socket.on('die', (msg) => {
		console.log('die: ' + msg);
		count ++
		if (count >= 3) {
			q.shift()
			io.emit('status', q);
		}
	});
});

// io.on('press', (socket) => {
	
// });

server.listen(3000, () => {
  console.log('listening on *:3000');
});