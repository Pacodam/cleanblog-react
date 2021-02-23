const router = require('express').Router();
const users = require('../controllers/user.controller');

module.exports = (app) => {
  router.post('/', users.findByUsernameAndPassword);

   router.get('/:id', users.findOne);

  router.delete('/logout', users.logout);

  router.get('/authchecker', users.authchecker);

 

  app.use('/api/users', router);
};
