const express = require('express');
const router = express.Router();
const AuthService = require('../services/authentication');
const MailService = require('../services/mail');
const ExamService = require('../services/exam');
const config = require('../config');
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});
router.get('/invite', function(req, res, next) {
  const data = {
    status: config.invitation_status.SENT,
    name: 'Silas',
    email: 'silakag@gmail.com',
    questions: ExamService.generateQuestionsXjt()
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

router.get('/info', (req, res) => {
  ExamService.getAllInvitations()
    .then(
      data => {
        return res.json(data);
      }
    )
});


router.post('/invite', function(req, res, next) {
  ExamService.generateQuestions()
    .then(questions => {
      console.log('qnn>>',questions);
      const data = {
        status: config.invitation_status.SENT,
        name: req.body.name,
        email: req.body.email,
        questions: questions.map(qn => {
          return {_id: qn._id, question: qn.question, duration: 0}
        })
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
    })
    .catch(err => {
      console.log("bigaanye");
      throw err;
    });
  
  
});

module.exports = router;
