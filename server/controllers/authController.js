const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const User = require('../app/models/user.model');

// TODO: watch jwt managing best practices
let token = '';

exports.signin = (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const password = req.body.password;
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      // eslint-disable-next-line consistent-return
      return res.status(404).send({ message: 'User Not found.' });
    }

    // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    bcrypt.compare(password, user.password, (error, same) => {
      if (same) {
        console.log(same);
        // TODO store user session
        token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
          expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
          id: user.id,
          username: user.username,
          photo: user.photo,
          accessToken: token,
        });
      } else {
        res.status(404).send({ accessToken: null, message: 'Wrong password' });
      }
    });
  });
};

exports.verifyToken = (req, res) => {
  res.send({ validToken: req.body.accessToken === token });
};
