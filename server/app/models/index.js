const mongoose = require('mongoose');

const dbConfig = require('../config/db.config.js');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.blogposts = require('./blogpost.model.js');
db.users = require('./user.model.js');
// db.delete_issues = require("./deleted_issue.model")(mongoose);

module.exports = db;
