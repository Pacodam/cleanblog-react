const mongoose = require('mongoose');

// mongoose.set('userCreateIndex', true);

const bcrypt = require('bcrypt');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
