const db = require('../models');

const DeletedIssue = db.delete_issues;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  console.log(req.body.due);
  // Create a Delete Issue
  const deletedIssue = new DeletedIssue({ ...req.body, deleted: new Date() });
  // Save Deleted_Issue in the database
  deletedIssue
    .save(deletedIssue)
    .then((data) => {
      res.send(data);
      // res.json({ issues: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Deleted Issue',
      });
    });
};
