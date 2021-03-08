// const errorResponse = require('../utils/error');
const BlogPost = require('../app/models/blogpost.model');
const User = require('../app/models/user.model');

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

exports.findByUserId = (req, res) => {
  console.log(req.params.id);
  BlogPost.find({ userId: req.params.id })
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// TODO add username to data
exports.findById = (req, res) => {
  BlogPost.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Not found' });
      } else {
        console.log(data.userId);
        User.findById(data.userId).then((userData) => {
          let username;
          if (userData) {
            username = userData.username;
          }
          // eslint-disable-next-line no-param-reassign
          data.username = userData.username;
          console.log(data);

          res.send(data);
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving post',
        error: err,
      });
    });
};

exports.create = (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body,
    userId: req.body.id,
    datePosted: new Date(),
  };

  const newPost = new BlogPost(post);

  newPost
    .save()
    .then(() => res.json('Post added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
