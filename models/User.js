const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const usersFile = path.join(__dirname, '../data/users.json');

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 4));
};

const loadUsers = () => {
    return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
};

const findUserByEmail = (email) => {
    const users = loadUsers();
    return users.find(user => user.email === email);
};

const findUserById = (id) => {
    const users = loadUsers();
    return users.find(user => user.id === id);
};

const addUser = (user) => {
    const users = loadUsers();
    user.id = Date.now().toString();
    user.password = bcrypt.hashSync(user.password, 10);
    users.push(user);
    saveUsers(users);
    return user;
};

module.exports = {
    findUserByEmail,
    findUserById,
    addUser
};
