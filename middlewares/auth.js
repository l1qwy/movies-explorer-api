const jwt = require('jsonwebtoken');

const { SECRET_KEY, NODE_ENV } = process.env;

const UnauthorizedError = require('../errors/notAuthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'secret-key');
  } catch (error) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
