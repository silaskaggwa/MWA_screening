const express = require('express');
const router = express.Router();
const path = require('path');
const ExamService = require('../services/exam');
const AuthService = require('../services/authentication');
const config = require('../config');


router.get('/admin', function(req, res) {

  console.log('cookies>>> ', req.cookies.id_token);
  res.sendFile(path.join(__dirname,'../public/index.html'));
});


module.exports = router;
