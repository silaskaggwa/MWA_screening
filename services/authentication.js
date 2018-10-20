const jwt = require('jsonwebtoken');
const config = require('../config');

const generate = (info) => {
  return Promise.resolve(jwt.sign(info, config.jwt.secret));
};

module.exports = { generate };