const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

const app = express();

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');


mongoose.connect(
  "mongodb+srv://murali:" + process.env.MONGO_ATLAS_PWD + "@cluster0-wb7kl.mongodb.net/mean-app?retryWrites=true"
);

// bodyParser allows us to fetch post data
app.use(bodyParser.json());

// cors() removes CORS related issues
app.use(cors());

// express intercepts the requests to sends required response.
//  It is a middleware that validates or modify requests/response
// every middleware should either end with next() or res, and not both
app.use((req, res, next) => {
  console.log("1st Middleware");
  // next() tells express that there is another middleware the request need to pass through
  // If this middleware is not sending res and no next(), Node waits for next middleware and timeouts
  next();
});

// middleware without path will be applied to all incoming requests
// call next() if there exists additional middelwares
// do not call next() if response already sent
app.use((req, res, next) => {
  // '*' allows request coming from any domain to access the resources
  res.setHeader("Access-Control-Allow-Origin", "*");
  // allows request coming from domain which have following headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
/*
requests with /images were allowed to access the images folder in backend
path helps in mapping images -> backend/images
*/
app.use('/images', express.static(path.join('backend/images')));

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;
