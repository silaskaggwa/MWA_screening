const User = require('../models/user');
const config = require('../config');


const createUser = (data) => {
    return new User(data).save();
}
const getUserById = (id) => User.findById(id);

const getUser = () => {
   return User.find({});
   
}

const getUserByEmail = (email) => {
    return User.findOne({email});
}
module.exports = {createUser, getUserById,getUser, getUserByEmail};