let mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let UserSchema = mongoose.Schema({
  userName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  adminType: {
    type: String,
    enum: ["admin", "office", "employee","assignEmployee"]
  },
})


UserSchema.methods.checkPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, result) {
    if (err) return cb(err);
    cb(false, result);
  });
};


UserSchema.methods.getUser = function () {
  var isComplete = true;
  if (
    !this.userName ||
    !this.adminType 
  ) {
    isComplete = false;
  }
  if (
    this.accountType === "company" &&
    (!this.gst || !this.companyName || !this.address)
  ) {
    isComplete = true;
  }
  return {
    userName: this.userName,
    adminType: this.adminType,
    isComplete: isComplete
  };
};

UserSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(
    {
      id: user._id.toHexString(),
    },
    process.env.ACCESS_TOKEN_SECRET
  );
  cb(false, token);
};

// UserSchema.statics.findUser = function (token, cb) {
//   const user = this;
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decode) {
//     if (err) return cb(err);
//     user.findOne({ _id: decode.id }, "-password", function (err, user) {
//       if (err) return cb(err);
//       console.log("uuu ", user);
//       cb(false, user);  
//     });
//   });
// };

UserSchema.statics.findUser = function (token) {
  const user = this;
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) return reject(err);
      user.findOne({ _id: decode.id }, "-password")
        .then(user => {
          // console.log("uuu ", user);
          resolve(user);
        })
        .catch(err => reject(err));
    });
  });
};


module.exports = mongoose.model("user", UserSchema);
