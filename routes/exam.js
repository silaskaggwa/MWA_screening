const express = require('express');
const router = express.Router();
const ExamService = require('../services/exam');

router.get('/', function(req, res, next) {
  ExamService.startExam(req.user.id)
    .then(examInfo => {
      res.status(200).json(examInfo);
    })
    .catch(err => {
      res.status(403).json(err);
    });
  // ExamService.getInvitationById(req.user.id)
  //   .then(invitation => {
  //     res.status(200).json(invitation);
  //   })
  //   .catch(err => {throw err});
});

module.exports = router;
