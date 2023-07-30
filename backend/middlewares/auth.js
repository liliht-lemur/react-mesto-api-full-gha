const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const {
  messageError, codeError,
} = require('../errors/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(codeError.UNAUTHORIZED).send(messageError.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(codeError.UNAUTHORIZED).send(messageError.unauthorized);
  }

  req.user = payload;
  next();
};

module.exports = auth;
