const express = require('express');
const app = express();
const http = require('http');
const { SocketAddress } = require('net');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs');

app.use(express.static('public'))


const file = fs.readFileSync('data.json');
const data = JSON.parse(file);
// console.log(student);

const q = data.q || []
const oq = data.oq || []

let count = 0;


const save = () => {
	fs.writeFile('data.json', JSON.stringify({ q, oq }), (err) => {
		if (err) throw err;
		console.log('Data written to file');
	});
}

io.on('connection', (socket) => {
	socket.on('press', (msg) => {
		// if (q[0].id == msg.id) {
		io.emit('press', msg);
		// }
	});

	socket.on('newPlayer', (data) => {
		let newPlayerFlag = true
		q.forEach(player => {
			if (player.id == data.id) {
				newPlayerFlag = false
			}
		})
		if (newPlayerFlag) {
			q.push(data)
			console.log(q)
			if (q.length == 1) {
				//do something
			}
		}
		io.emit('status', q);


	});

	socket.on('die', (msg) => {
		console.log('die: ' + msg);
		count++
		if (count >= 3) {
			q.shift()

			io.emit('status', q);
			save()
			count = 0
		}
	});
	socket.on('skip', (msg) => {
		console.log("skip")
		q.shift()
		count = 0
		io.emit("status", q)
	})
});

// io.on('press', (socket) => {

// });

server.listen(3000, () => {
	console.log('listening on *:3000');
});