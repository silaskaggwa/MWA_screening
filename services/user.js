const User = require('../models/user');
const config = require('../config');


const createUser = (data) => {
    return new User(data).save();
}
const getUserById = (id) => User.findById(id);

const getUser = () => {
   return User.find({}); 
}
const deactivateUser = (email) => {
    return User.update({email:email},{$set:{active:false}});  
 }
const activateUser = (email) => {
    return User.update({email:email},{$set:{active:true}});   
 }

const getUserByEmail = (email) => {
    return User.findOne({email});
}
module.exports = {createUser, getUserById,getUser,deactivateUser,activateUser,getUserByEmail};

