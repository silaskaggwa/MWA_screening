require('dotenv').config();

module.exports = {
	port: process.env.PORT || 3000,
	host: process.env.HOST || 'http://localhost:3000',
	jwt: {
		secret: process.env.JWT_SECRET || '<the secret>',
	},
	database: {
		url: process.env.DATABASE_URL || 'mongodb://localhost:27017/screening',
	},
	mail: {
		service: process.env.MAIL_SERVICE || 'gmail',
		auth: {
			user: process.env.MAIL_USER || '<the mail user>',//'tas.screening.mwa@gmail.com',
			pass: process.env.MAIL_PASS || '<the mail password>'//'tigist_alem_silas'
		},
		tls: {
			rejectUnauthorized: false
		}
	},
	exam: {
		duration: process.env.EXAM_DURATION || 120
	},
	invitation_status: {
		SENT: 'sent',
		STARTED: 'started',
		ANSWERED: 'answered', 
		PASS: 'pass',
		FAIL: 'fail'
	} 
};