const express = require('express');

const router = express.Router();

// model() of mongoose allows us to create constructor for model which gives access to mongodb methods
const Post = require("../models/post");

router.post("", (req, res, next) => {
  const post = Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json(result._id);
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json(documents);
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById({_id: req.params.id}).then(post => {
    console.log(post);
    res.status(200).json(post);
  })
});

router.delete("/:id", (req, res, next) => {
  console.log("id", req.params.id);
  Post.deleteOne({ _id: req.params.id })
    .then(result => res.status(200).json("Post deleted"))
    .catch(error => console.log(error));
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update Successfule'})
  })
});

module.exports = router;

