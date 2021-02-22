/* eslint-disable */
// These are our routes:

// /api/: GET, POST, DELETE
// /api/posts/:id: GET, PUT, DELETE
// /api/posts/published: GET
const router = require('express').Router();
const blogposts = require('../controllers/blogpost.controller');


module.exports = (app) => {

  //TODO differente routes file
  //router.post('/', blogposts.create);

  router.get('/', blogposts.findAll);

  router.get('/:id', blogposts.findOne);

  router.post('/', blogposts.create);

  app.use('/api/blogposts', router);

  //  router.get("/count", issues.countIssues);
  // router.get("/:id", issues.findOne);
  // router.put("/:id", issues.update);
  // router.delete("/:id", issues.delete);
};
