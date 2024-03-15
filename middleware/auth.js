const jwt = require("jsonwebtoken");
const { SELLER } = require("../constant/role");

function checkAuthentication(req, res, next) {
  try {
    let token = req.headers.authorization?.replaceAll("Bearer ", "");
    if (token) {
      const decoded = jwt.verify(token, "shhhhh");
      req.user = decoded;
      // if(decoded.role == SELLER){
      //   return next();
      // } else {
      //   return res.send({
      //     message: 'unauthorized access'
      //   })
      // }
      return next();
    }
    res.status(401).send({
      message: "unautheticated access",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkAuthentication,
};
