const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hashPassword => {
    const user = new User({
      email: req.body.email,
      password: hashPassword
    });
    user.save().then(
      result => {
        res.status(201).json({
          message: "user created",
          result: result
        });
      },
      error => {
        res.status(500).json({ error: error });
      }
    );
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      fetchedUser = user;
      // this yeilds a promise
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res
          .status(404)
          .json({ message: "Email Password combination wrong" });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "this_should_be_long_to_verify_jwt_on_server",
        { expiresIn: "1hr" }
      );
      return res.status(200).json({ token: token, expiresIn: 3600, userId: fetchedUser._id });
    })
    .catch(err => {
      res.status(404).json({error: err});
    });
});

module.exports = router;
