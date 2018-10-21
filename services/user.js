const User = require('../models/user');
const config = require('../config');


const createUser = (data) => {
    return new User(data).save();
}
const getUserById = (id) => User.getUserById(id);

module.exports = {createUser, getUserById};