const Invitation = require('../models/invitation');

const createInvitation = (data) => {
    return new Invitation(data).save();
}
const getInvitationById = (id) => Invitation.findById(id);

module.exports = {createInvitation, getInvitationById};