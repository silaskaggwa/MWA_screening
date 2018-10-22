const express = require('express');
const router = express.Router();
const path = require('path');
const ExamService = require('../services/exam');
const AuthService = require('../services/authentication');
const config = require('../config');

router.get('/start', (req, res) => {
  ExamService.startExam(req.user.id)
    .then(examInfo => {
      AuthService.generate({id: req.user.id}).then(token => {
        res.cookie('id_token', token, {expire: config.exam.duration*60000});
        res.redirect('/exam');
      });
    })
    .catch(err => {
      res.status(403).json(err);
    });
});

router.get('/', (req, res) => {
  //console.log('cookies>>> ', req.cookies.id_token);
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

router.get('/questions', (req, res) => {
  console.log('user>>> ', req.user);
  ExamService.getInvitationById(req.user.id)
    .then(invitation => {
      return res.json({
        name: invitation.name,
        email: invitation.email,
        questions: invitation.questions,
        duration: config.exam.duration
      })
    });
});

router.patch('/', (req, res) => {
  ExamService.addProgress(req.user.id, req.body)
    .then(info => {
      console.log('info>>',info);
      return res.status(201).json({status: 'success'});
    })
    .catch(err => {
      return res.status(500).end({status: 'failed'});
    });
});

module.exports = router;
