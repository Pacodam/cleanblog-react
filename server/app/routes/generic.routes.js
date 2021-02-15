const router = require('express').Router();
const generic = require('../controllers/generic.controller');

module.exports = (app) => {
  router.post('/contact', generic.contact);

  app.use('/api', router);
};
