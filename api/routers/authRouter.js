const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const registerValidate = require('../validates/registerValidate');

const createToken = user => {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: '1d' });
};

authRouter.post('/register', async (req, res) => {
  const { errors, isValid } = registerValidate(req.body);
  const { username, password } = req.body;

  if (!isValid) return res.status(404).json({ errors });

  const user = await User.findOne({ username });

  if (user) {
    errors.push('username is used');
    return res.status(404).json({ errors });
  }
  const newUser = new User({
    username,
    password,
  });
  await newUser.save();
  const token = createToken(newUser.toJSON());

  return res.status(200).json({ user: newUser, token });
});

module.exports = authRouter;
