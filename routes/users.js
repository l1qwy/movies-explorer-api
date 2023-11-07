const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { emailRegex } = require('../utils/constants');

const {
  getMe,
  editUserInfo,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), editUserInfo);

module.exports = router;
