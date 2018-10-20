const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport(config.mail);

let mailOptions = {
  from: config.mail.auth.user, // sender address
};

const create = (options) => {
	transporter.sendMail(options, (err, info) => {
		if(err)
			console.log(err)
		else
			console.log(info);
	});
}

const sendInvitationEmail = (name, email, token) => {
	mailOptions.to = email;
	mailOptions.subject = "Screening Test Invitation";
	mailOptions.html = `
		<p>Dear ${name}, </p>
		<a href="${config.host+'/exam/?token='+token}">Click here to start test</a>
	`;
	create(mailOptions);
}

module.exports = { create, sendInvitationEmail };