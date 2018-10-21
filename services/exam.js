const Invitation = require('../models/invitation');
const config = require('../config');

const createInvitation = (data) => {
    return new Invitation(data).save();
}
const getInvitationById = (id) => Invitation.findById(id);

const generateQuestions = () => {
    return [
        {_id: 55, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', duration: 0},
        {_id: 56, question: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', duration: 0},
        {_id: 57, question: 'Facilisis volutpat est velit egestas dui id. Eget magna fermentum iaculis eu non. Ultrices in iaculis nunc sed augue lacus viverra vitae. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Fusce ut placerat orci nulla pellentesque dignissim enim.', duration: 0}
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

module.exports = {createInvitation, getInvitationById, startExam, generateQuestions};