var User = require("../models/User");

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token")||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
}

exports.adminAuth = (req, res, next) => {
  try {
    let token = getTokenFromHeader(req);
    User.findUser(token, (err, user) => {
      if (err) throw err;
      if (!user) next("User Not Found");
      else if (user.isBlocked == true)
        next({ status: 401, message: "User is Blocked" });
      else if (user.adminType != "admin")
        next({ status: 401, message: "Unauthorised Access" });
      else {
        req.token = token;
        delete user.password;
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.log('r',err);
    next({ status: 401, message: err });
  }
};
