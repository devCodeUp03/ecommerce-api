const { SELLER } = require("../constant/role");

const seller = (req, res, next) => {
  if (req.user.role == SELLER) {
    return next();
  }
  res.send({
    message: "unauthorized access",
  });
};

module.exports = seller;
