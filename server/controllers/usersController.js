/* eslint-disable prefer-destructuring */
const bcrypt = require('bcrypt');
const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const User = require('../app/models/user.model');

exports.findByUsernameAndPassword = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  //   const username = req.body.username;
  //   const password = req.body.password;
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

exports.create = (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, _file, cb) {
      cb(null, '../images');
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  let upload = multer({ storage, fileFilter });

  router.route('/').post(upload.single('photo'), (req, res) => {
    console.log('api');
    // eslint-disable-next-line prefer-destructuring
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const photo = req.file.filename;
    const created = new Date();

    const newUserData = {
      username,
      email,
      password,
      photo,
      created,
    };

    const newUser = new User(newUserData);
    console.log(newUser);

    newUser
      .save()
      .then(() => res.json('User Added'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
};
