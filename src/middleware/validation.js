const net = require("net");

const validate = (req, res, next) => {
  if (net.isIP(req.params.ip) === 4) {
    return next();
  }
  return res.status(404).send("Not Found");
};

module.exports = validate;
