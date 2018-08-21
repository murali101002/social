// model() of mongoose allows us to create constructor for model which gives access to mongodb methods
const Post = require("../models/post");

// POST
exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(result => {
    console.log(result);
    res.status(201).json({
      ...result,
      id: result._id
    });
  });
}

// GET ALL
exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currPage = +req.query.page;
  const postQuery = Post.find();
  let postsData;
  if (pageSize && currPage) {
    // skip 1st n records and limit results to m records
    // following query executes only on 'then'
    // skip() is expensive: https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
    postQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
  }
  /*
  Post.count() in mongo returns length of collection
  result of returned query Post.count() can be fetched by chaining then
  documents in 1st then cannot be accessed in 2nd then, so we store in variable to emit in 2nd then
  */
  postQuery
    .then(documents => {
      postsData = documents;
      return Post.count();
    })
    .then(postsCount => {
      res.status(200).json({ posts: postsData, postsCount: postsCount });
    });
}

// GET POST BY ID
exports.getPost = (req, res, next) => {
  Post.findById({ _id: req.params.id }).then(post => {
    console.log(post);
    res.status(200).json(post);
  });
}

// UPDATE POST
exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    post
  ).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Updated Successful" });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  });
}

// DELETE POST
exports.deletePost = (req, res, next) => {
  console.log("id", req.params.id);
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json("Post deleted");
      } else {
        res.status(401).json("Not authorized");
      }
    })
    .catch(error => console.log(error));
}



// DELETE POST



