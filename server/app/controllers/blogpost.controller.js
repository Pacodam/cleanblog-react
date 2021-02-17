const Mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const db = require('../models');

const User = db.users;
const BlogPost = db.blogposts;

exports.findAll = (req, res) => {
  BlogPost.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  BlogPost.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Not found' });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving post',
        error: err,
      });
    });
};

// TODO this should go to user.controller. Add email and duplicated username, mail, https://bezkoder.com/node-js-mongodb-auth-jwt/
//TODO bcrypt hashing outside model
exports.create = (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
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

  const upload = multer({ storage, fileFilter }).single('photo');

  // const upload = multer({     storage: storage }).single('featuredImage');

  const username = req.body.username;
  const password = req.body.password;
  const photo = req.file.filename;

  const newUserData = {
    username,
    password,
    photo,
  };

  const newUser = new User(newUserData);

  newUser
    .save()
    .then(() => res.json('User Added'))
    .catch((err) => res.status(400).json('Error: ' + err));
};
