const express = require('express');
const router = express.Router();
const ExamService = require('../services/exam');

router.get('/', function(req, res, next) {
  ExamService.getInvitationById(req.user.id)
    .then(invitation => {
      res.status(200).json(invitation);
    })
    .catch(err => {throw err});
});

module.exports = router;
