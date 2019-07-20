/* eslint-disable */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(clientPassword, cb) {
  bcrypt.compare(clientPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.set('toJSON', { getters: true });

UserSchema.options.toJSON.transform = function(doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.password;
  return ret;
};

module.exports = mongoose.model('User', UserSchema);
