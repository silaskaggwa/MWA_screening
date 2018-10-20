const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {type: String, required: true},
    active: Boolean,
    created_at: Date,
    updated_at: Date,
});

QuestionSchema.pre('save', next => {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at) this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('Question', QuestionSchema);