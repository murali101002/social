const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // new attributes can be added to req which will be passed on to next middleware
    req .userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Auth Failed'});
  }
};
