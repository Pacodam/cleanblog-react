const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const path = require('path');
// const { auth2 } = require("./middleware/auth");

// configurations
const config = require('./config');
const dbConnect = require('./config/db');

// routes
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
// const passport = require('./config/passport');

// use MIddlewares
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);

app.use((req, res, next) => {
  // Prevents auth leaks when going back in browser
  res.set('Cache-Control', 'no-store');
  next();
});

// app.use(passport.initialize());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//  simple route
app.get('/', (req, res) => {
  res.json({ message: 'welcome to CleanBlog application.' });
});

// use routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// For Deploying client & api on one server
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.resolve(__dirname, "../", "client", "build")));
//     app.get("*", (req, res) => {
//       res.sendFile(
//         path.resolve(__dirname, "../", "client", "build", "index.html")
//       );
//     });
//   }

// TODO config.Port crashes
app.listen(8000, () => {
  console.log(`Server is running on port ${config.PORT}`);
  dbConnect();
});
