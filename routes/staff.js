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
    questions: [
      {_id: 55, question: 'Question one', duration: 0},
      {_id: 56, question: 'Question two', duration: 0},
      {_id: 57, question: 'Question three', duration: 0}
    ]
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
