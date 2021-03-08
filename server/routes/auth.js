const express = require('express');

const route = express.Router();
const controller = require('../controllers/authController');

route.post('/signin', controller.signin);

route.post('/verifyToken', controller.verifyToken);

module.exports = route;
