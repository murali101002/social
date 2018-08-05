const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// model() of mongoose allows us to create constructor for model which gives access to mongodb methods
const Post = require("./models/post");

mongoose.connect(
  "mongodb+srv://murali:nanisiri@cluster0-wb7kl.mongodb.net/mean-app?retryWrites=true"
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json(result._id);
  });

});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json(documents);
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log('id', req.params.id);
  Post.deleteOne({ _id: req.params.id}).then(result => res.status(200).json('Post deleted')).catch(error => console.log(error));
});

module.exports = app;
