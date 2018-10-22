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
	mailOptions.subject = "Screening Test Invitation "+Math.floor(Math.random()*100);
	mailOptions.html = `
		<p>Dear ${name}, </p>
		<p>*Invitation link can only be used once!</p>
		<a href="${config.host+'/exam/start/?token='+token}">Click here to start test</a>
	`;
	create(mailOptions);
}

module.exports = { create, sendInvitationEmail };