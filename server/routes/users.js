const express = require('express');

const route = express.Router();
const controller = require('../controllers/usersController');

// route.post('/', controller.findByUsernameAndPassword);

route.post('/', controller.create);

// route.get('/:id', controller.findById);

// route.delete('/logout', controller.logout);

// route.get('/authchecker', controller.authchecker);

module.exports = route;
