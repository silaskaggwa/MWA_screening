const Invitation = require('../models/invitation');
const Question = require('../models/questions');
const config = require('../config');

//save new question
const createQuestion = (data) => {
    //console.log('createQuestion');
    return new Question(data).save();
}

const createInvitation = (data) => {
    return new Invitation(data).save();
}
const getInvitationById = (id) => Invitation.findById(id);

const generateQuestions = () => {
    return [
        {_id: 55, question: 'Question one', duration: 0},
        {_id: 56, question: 'Question two', duration: 0},
        {_id: 57, question: 'Question three', duration: 0}
    ];
}

const startExam = (id) => {
    return new Promise((resolve, reject) => {
        Invitation.findOne({_id: id, status: config.invitation_status.SENT}, (err, invitation) => {
            if(err) throw err;
            if(invitation){
                //invitation.status = config.invitation_status.STARTED;
                invitation.started_at = new Date();
                invitation.shd_answer_by = new Date(invitation.started_at.getTime() + config.exam.duration*60000);
                invitation.save(err => {
                    if(err) throw err;
                    resolve({
                        name: invitation.name,
                        email: invitation.email,
                        questions: invitation.questions,
                    });
                });
            }else{
                reject({status: 'forbidden'});
            }
        })
    });
}

module.exports = {createInvitation, getInvitationById, startExam, generateQuestions,createQuestion};