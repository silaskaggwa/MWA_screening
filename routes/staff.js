const express = require('express');
const router = express.Router();
const AuthService = require('../services/authentication');
const MailService = require('../services/mail');
const ExamService = require('../services/exam');
const config = require('../config');

router.get('/invite', function(req, res, next) {
  const data = {
    status: config.invitation_status.SENT,
    name: 'Silas',
    email: 'silakag@gmail.com',
    questions: ExamService.generateQuestions()
  };
  ExamService.createInvitation(data)
    .then(invitation => {
      AuthService.generate({id: invitation._id}).then(token => {
        MailService.sendInvitationEmail(invitation.name, invitation.email, token);
      });
      res.status(200).json({success: true});
    })
    .catch(err => {
      throw err
    });
});
router.post('/invite', function(req, res, next) {
  console.log('gsfhdf>>', req.body)
  const data = {
    status: config.invitation_status.SENT,
    name: req.body.name,
    email: req.body.email,
    questions: ExamService.generateQuestions()
  };
  ExamService.createInvitation(data)
    .then(invitation => {
      AuthService.generate({id: invitation._id}).then(token => {
        MailService.sendInvitationEmail(invitation.name, invitation.email, token);
      });
      res.status(200).json({success: true});
    })
    .catch(err => {
      throw err
    });
});

module.exports = router;
