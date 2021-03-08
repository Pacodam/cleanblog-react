const express = require('express');

const router = express.Router();
const controller = require('../controllers/postsController');

router.get('/', controller.findAll);

router.get('/:id', controller.findById);

router.get('/user-posts/:id', controller.findByUserId);

router.post('/', controller.create);

module.exports = router;
