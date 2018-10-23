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

router.get('/admin', function(req, res) {
  console.log('cookies>>> ', req.cookies.id_token);
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

router.get('/questions', (req, res) => {
  ExamService.getInvitationById(req.user.id)
    .then(invitation => {
      const remaining_minutes = parseInt((invitation.shd_answer_by - new Date())/60000);
      const duration_minutes = parseInt((invitation.shd_answer_by - invitation.started_at)/60000);

      if(invitation.status == config.invitation_status.ANSWERED){
        res.clearCookie('id_token');
        return res.json({status: 'ended'});
      }else if(remaining_minutes <= 0){
        ExamService.setExamStatus(invitation._id, config.invitation_status.ANSWERED);
        res.clearCookie('id_token');
        return res.json({status: 'ended'});
      }else{
        return res.json({
          name: invitation.name,
          email: invitation.email,
          questions: invitation.questions.map(
            qn => ExamService.packageQuestion(qn)
          ),
          time_used: duration_minutes - remaining_minutes,
          time_away: invitation.time_away,
          duration: duration_minutes
        })
      }
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

router.patch('/end', (req, res) => {
  ExamService.endExam(req.user.id, req.body)
    .then(info => {
      console.log('info>>',info);
      return res.status(201).json({status: 'ended'});
    })
    .catch(err => {
      return res.status(500).end({status: 'failed'});
    });
});

module.exports = router;
