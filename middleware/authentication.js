const jwt = require('express-jwt');
const config = require('../config');

const authenticated = jwt({
	secret: config.jwt.secret,
	credentialsRequired: false,
	getToken: (req) => {
		token = req.query.token;
		//console.log("cred_token>>>>>>",token);
		//console.log("cookiesss>>>>>>",req.cookies);
		if (token) return token;
		else if(req.cookies.id_token){
			return req.cookies.id_token
		}
		return null;
	},
});

module.exports = { authenticated };