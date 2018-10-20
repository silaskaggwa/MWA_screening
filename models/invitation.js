const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    text: {type: String, required: true},
    timeStamp: {type: Date, required: true}
})

const AssignedQuestionSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    question: {type: String, required: true},
    duration: {type: Number, required: true},
    progress: [ProgressSchema]
});

const InvitationSchema = new mongoose.Schema({
    status: {type: String, required: true, enum: ['sent', 'answered', 'pass', 'fail']},
    email: {type: String, required: true},
    questions: [AssignedQuestionSchema],
    active: Boolean,
    started_at: Date,
    ended_at: Date,
    time_off: Number,
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