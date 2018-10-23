const express = require('express');

const router = express.Router();
const path = require('path');
const ExamService = require('../services/exam');
const AuthService = require('../services/authentication');
const UserService = require('../services/user');
const config = require('../config');

router.get('/admin', function (req, res) {

  console.log('cookies>>> ', req.cookies.id_token);
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//admin save user
router.post('/user/create', function (req, res) {
  console.log('body>>> ', req.body);
  UserService.createUser({
    name: req.body.fname,
    email: req.body.email,
    role: req.body.role,
    active: true,
  }).then((info) => {
    console.log('saveUser>>', info)
  }).catch(err => { throw err });
});

//admin get user list
router.get('/user', function (req, res) {
  //console.log('hi form router')
  console.log('cookies>>> ', req.cookies.id_token);
  UserService.getUser()
    .then(data => {
      res.json(data);
    });
  
});

//admin save question
router.post('/questions/create', function (req, res) {

  console.log('body>>>> ', req.body);
  ExamService.createQuestion({
    question: req.body.question,
    active: req.body.active,
  }).then((info) => {
    console.log('savedQuestion>>', info)
  }).catch(err => { throw err });
});

module.exports = router;
