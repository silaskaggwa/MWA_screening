const jwt = require('express-jwt');
const config = require('../config');

const authenticated = jwt({
	secret: config.jwt.secret,
	credentialsRequired: false,
	getToken: (req) => {
		token = req.query.token;
		console.log("token>>>>>>",token);
		if (token) return token;
		return null;
	},
});

module.exports = { authenticated };