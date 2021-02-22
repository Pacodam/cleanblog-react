/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const db = require('../models');

const User = db.users;

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: 'User was registered successfully!' });
          });
        }
      );
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: 'User was registered successfully!' });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  console.log('hola', req.body);
  const password = req.body.password;
  console.log(User);
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }
    console.log('user', user);

    // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    bcrypt.compare(password, user.password, (error, same) => {
      if (same) {
        console.log(same);
        // TODO store user session : commented because is needed a way to manage without Redux
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });
        console.log(token);
        res.status(200).send({
          id: user.id,
          username: user.username,
          photo: user.photo,
          accessToken: token,
        });
        //   const sessUser = { id: user.id, username: user.username, photo: user.photo };
        //   req.session.user = sessUser; // Auto saves session data in mongo store
        //   res.json({ msg: ' Logged In Successfully', sessUser }); // sends cookie with sessionID automatically in response
        // res.send(user);
      } else {
        console.log("wrong pass")
        res.status(404).send({ accessToken: null, message: 'Wrong password' });
      }
    });

    // if (!passwordIsValid) {
    //   return res.status(401).send({
    //     accessToken: null,
    //     message: 'Invalid Password!',
    //   });
    // }
  });
};
