/* eslint-disable */
//TODO review this code
//TODO look at todos related to create user in blogpost.controller
const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let User = require('../models/user.model');

module.exports = (app) => {
    app.use('/api/new-user', router);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/').post(upload.single('photo'), (req, res) => {
    console.log("api")
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
        created
    }

    const newUser = new User(newUserData);
    console.log(newUser);

    newUser.save()
           .then(() => res.json('User Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});

}