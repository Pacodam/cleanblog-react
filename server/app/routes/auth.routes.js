const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');
const router = require('express').Router();

// module.exports = function (app) {
//   console.log("here")
//   app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//     next();
//   });

//   // app.post(
//   //   '/api/auth/signup',
//   //   [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
//   //   controller.signup
//   // );

//   app.post('/api/auth/signin', controller.signin);
// };

module.exports = (app) => {
  router.post('/signin', controller.signin);

  router.post('/verifyToken', controller.verifyToken);

  app.use('/api/auth', router);
}
