//const User = require('../model/user');

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
   createUser(data)
   { 
     console.log('hiii');
   // return new User(data).save();
    }
// const getUserById = (id) => User.getUserById(id);
//   getData(){
//     return this.data;
//   }
  
}

  

// const createUser = (data) => {
//     return new User(data).save();
// }
// const getUserById = (id) => User.getUserById(id);

// module.exports = {createUser, getUserById};