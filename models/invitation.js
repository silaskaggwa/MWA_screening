const mongoose = require('mongoose');
const status = require('../config').invitation_status

const ProgressSchema = new mongoose.Schema({
    text: {type: String, required: true},
    timeStamp: {type: Date, required: true}
})

const AssignedQuestionSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    question: {type: String, required: true},
    duration: {type: Number},
    progress: [ProgressSchema]
});

const InvitationSchema = new mongoose.Schema({
    status: {
        type: String, 
        required: true, 
        enum: [
            status.SENT, 
            status.STARTED, 
            status.ANSWERED, 
            status.PASS, status.FAIL
        ]
    },
    name: {type: String, required: true},
    email: {type: String, required: true},
    questions: [AssignedQuestionSchema],
    started_at: Date,
    shd_answer_by: Date,
    answered_at: Date,
    time_used: Number,
    time_away: Number,
    created_at: Date,
    updated_at: Date,
});

InvitationSchema.pre('save', next => {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at) this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('Invitation', InvitationSchema);