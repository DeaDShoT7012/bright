var jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  const token = jwt.sign(
    { id: id.toHexString() },
    process.env.ACCESS_TOKEN_SECRET
  );
  return token;
};