const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true, enum: ['admin', 'staff']},
    active: Boolean,
    created_at: Date,
    updated_at: Date,
});

UserSchema.pre('save', next => {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at) this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('User', UserSchema);