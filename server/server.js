// npm cache clean -f
// rm -rf node_modules
// npm i

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// trying express sessions
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(express.json()); // ?

// const fileServerMiddleware = express.static("public");
// app.use("/", fileServerMiddleware);
//  const fs = require('fs');

//  parse requests of content-type -application/json
app.use(bodyParser.json());
//  parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//  console.log(db); ¿how is accessing url?
const db = require('./app/models');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to the database!'))
  .catch((err) => {
    console.log('cannot connect to the database!', err);
    process.exit();
  });

// Setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: db.url,
  collection: 'mySessions',
});

// Express-Session
app.use(
  session({
    name: 'COOKIE_NAME', // name to be put in "key" field in postman etc
    secret: "PAPAYA",
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
      sameSite: false,
      secure: false,
    }
  })
);

//  simple route
app.get('/', (req, res) => {
  res.json({ message: 'welcome to CleanBlog application.' });
});

require('./app/routes/user.routes.js')(app);
require('./app/routes/blogpost.routes')(app);
require('./app/routes/newUser.routes')(app);
require('./app/routes/generic.routes.js')(app);
require('./app/routes/auth.routes')(app);
// require('./app/routes/deleted_issue.routes')(app);

const PORT = process.env.API_SERVER_PORT || 8000;

app.listen(PORT, () => {
  console.log(`API server started on port ${PORT}`);
});
