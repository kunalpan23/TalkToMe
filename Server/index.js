const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

const { addUser, getUser, removeUser } = require('./Users');

io.on('connection', (socket) => {
	console.log('User Connected');

	socket.on('join', (data, callback) => {
		const { error, user } = addUser({
			id: socket.id,
			name: data.name,
			room: data.room
		});
		console.log('User Added with Id', socket.id);
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

	socket.on('sendMessage', (mgs, callback) => {
		const user = getUser(socket.id) || {};
		if (Object.keys(user).length) {
			io.to(user.room).emit('message', { user: user.name, text: mgs });
			callback();
		}
	});

	socket.on('disconnect', () => {
		console.log('User Disconnected');
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', {
				user: 'admin',
				text: `${user.name} has left.`
			});
		}
	});
});

app.use(require('./router'));
// app.use(cors());

server.listen(PORT, () => {
	console.log(`Server is running on Port ${PORT}`);
});
