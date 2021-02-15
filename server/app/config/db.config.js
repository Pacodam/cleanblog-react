require('dotenv').config();

const URL = process.env.DB_URL || 'mongodb://localhost/cleanblog';

module.exports = {
  url: URL,
};
