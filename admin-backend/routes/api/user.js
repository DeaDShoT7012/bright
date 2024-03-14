const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("user");
const bcrypt = require("bcrypt");
var auth = require("../../libs/auth");
const { generateToken } = require("../../libs/token");

router.post("/signup", async function (req, res) {
  try {
    var userName = req.body.userName;
    var password = req.body.password;
    var email = req.body.email;
    var adminType = req.body.adminType;
    console.log("uuuu ", adminType);
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(200).json({ message: "Account  Already Exist" });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          throw err;
        } else {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
              throw err;
            } else {
              password = hash;
              var newUser = new User({
                userName,
                email,
                password,
                adminType,
              });
              newUser.save();
              res.status(200).json({ message: "Account Created" });
            }
          });
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
});


router.post("/signin",async function (req, res) {
 try{ 
  var userName = req.body.userName;
  var password = req.body.password;
 const user = await User.findOne({ userName: userName }) 
    if (!user) {
      res.status(500).json({ message: "User not found" });
    } else {
      user.checkPassword(password, function (err, result) {
        if (result) {
          console.log('err',result);
        }
        if (result) {
          var response = user.getUser();
          user.generateToken(function (err, token) {
            if (token) {
              response.token = token;
              res.status(200).json(response);
            }
          });
        } else {
          res.status(400).json({ message: "Incorrect password" });
        }
      });
    }
}
catch(error){
console.log(error);
}
});

router.get("/", auth.adminAuth, function (req, res) {
  try{
    if (req.user) {
      res.json({ message: "authenticated", status: 1 });
    }
  }
  catch(err){
    console.log('err',err); 
  }
});

router.get("/admin-auth", auth.adminAuth, function (req, res, next) {
  try {
    console.log('req',req.user);
    res.status(200).json({ users: req.user });
  } catch (err) {
    console.log('err',err);
    next({ status: 400, message: err });
  }
});

module.exports = router;
