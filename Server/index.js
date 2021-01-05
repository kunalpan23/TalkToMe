const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

const { addUser, getUser } = require('./Users');

io.on('connection', (socket) => {
	console.log('User Connected');

	socket.on('join', (data, callback) => {
		const { error, user } = addUser({
			id: socket.id,
			name: data.name,
			room: data.room
		});

		if (error) {
			return callback(error);
		}

		socket.emit('message', {
			user: 'admin',
			text: `${user.name} welcome to the ${user.room}`
		});
		socket.broadcast.to(user.room).emit('message', {
			user: 'admin',
			text: `${user.name} has joined!!!`
		});

		socket.join(user.room);

		callback();
	});

	socket.on('userMessage', (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit('message', { user: user.name, text: message });

		callback();
	});

	socket.on('disconnect', () => {
		console.log('User Disconnected');
	});
});

app.use(require('./router'));

server.listen(PORT, () => {
	console.log(`Server is running on Port ${PORT}`);
});
