const USERS = [];

const addUser = ({ id, name, room }) => {
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	const userExist = USERS.find(
		(user) => user.name === name && user.room === room
	);

	if (userExist) return { error: 'User Already Exist!' };

	const user = { id, name, room };
	USERS.push(user);

	return user;
};

const removeUser = (id) => {
	/* Removes the user based on the socket id */
	const user = USERS.findIndex((user) => user.id === id);

	if (user !== -1) {
		return USERS.splice(user, 1)[0];
	}
};

const getUser = (id) => USERS.find((user) => user.id === id);

const getAllUsersInRoom = (room) => USERS.filter((user) => user.room === room);

module.exports = {
	addUser,
	removeUser,
	getAllUsersInRoom,
	getUser
};
