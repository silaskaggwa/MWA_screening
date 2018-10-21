const express = require('express');
const router = express.Router();
const path = require('path');
const ExamService = require('../services/exam');
const AuthService = require('../services/authentication');
const config = require('../config');

router.get('/', function(req, res) {
  ExamService.startExam(req.user.id)
    .then(examInfo => {
      AuthService.generate({id: req.user.id}).then(token => {
        res.cookie('id_token', token, {expire: config.exam.duration*60000});
        res.redirect('/exam/answer');
      });
    })
    .catch(err => {
      res.status(403).json(err);
    });
});

router.get('/answer', function(req, res) {
  console.log('cookies>>> ', req.cookies.id_token);
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

router.get('/admin', function(req, res) {
  console.log("hiii");
  console.log('cookies>>> ', req.cookies.id_token);
  res.sendFile(path.join(__dirname,'../public/index.html'));
});


module.exports = router;
