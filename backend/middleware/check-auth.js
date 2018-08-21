const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'this_should_be_long_to_verify_jwt_on_server');
    // new attributes can be added to req which will be passed on to next middleware
    req .userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Auth Failed'});
  }
};
