const bcrypt = require('bcrypt');
const Mongoose = require('mongoose');

const db = require('../models');

const User = db.users;

exports.findByUsernameAndPassword = (req, res) => {
  // const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;
  console.log('findUPass', username, password);
  User.findOne({ username }, (error, user) => {
    if (user) {
      console.log(user);
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // TODO store user session : commented because is needed a way to manage without Redux
          //   const sessUser = { id: user.id, username: user.username, photo: user.photo };
          //   req.session.user = sessUser; // Auto saves session data in mongo store
          //   res.json({ msg: ' Logged In Successfully', sessUser }); // sends cookie with sessionID automatically in response
          res.send(user);
        } else {
          res.status(404).send({ message: 'Wrong password' });
        }
      });
    } else {
      res.status(400).send({ message: 'error retrieving user' });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw (err, res.clearCookie('session-id')); // clears cookie containing expired sessionID
    res.send('logged out successfully');
  });
};

// exports.logout = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       res.clearCookie('session-id');
//     }
//     res.send('logged out successfully');
//   });
// };

exports.authchecker = (req, res) => {
  const sessUser = req.session.user;
  console.log('authchecker api ', req.session.user);
  if (sessUser) {
    return res.json({ msg: 'Authenticated Successfully', sessUser });
  }
  return res.status(401).json({ msg: 'Unauthorized' });
};
