const express = require("express");
const router = express.Router();
/*
used to check api requests for valid jwt to secure routes
we secure post/delete routes and open get routes
*/
const checkAuthMiddleware = require("../middleware/check-auth");

const PostController = require("../controllers/posts");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Invalid MIME Type");
    if (isValid) {
      error = "";
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(" ").join("-");
    console.log(fileName, file);
    cb(null, fileName + "_" + Date.now() + "." + MIME_TYPE[file.mimetype]);
  }
});

/*
express middlewares can accept any number of functions
multer accepts single file which will have 'image' as key in its payload and applies 'storage' function to it
*/
router.post(
  "",
  checkAuthMiddleware,
  multer({ storage: storage }).single("image"),
  PostController.createPost
);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuthMiddleware, PostController.deletePost);

router.put(
  "/:id",
  checkAuthMiddleware,
  multer({ storage: storage }).single("image"),
  PostController.updatePost
);

module.exports = router;
