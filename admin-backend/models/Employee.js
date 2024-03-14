let mongoose = require("mongoose");
const bcrypt = require("bcrypt");


let EmployeeSchema = mongoose.Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
    date:{
        type:String
    },
    designation:{
        type:String
    },
    password:{
        type:String
    },
    confirmPswd:{
        type:String
    },

})

EmployeeSchema.methods.checkPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, result) {
      if (err) return cb(err);
      cb(false, result);
    });
  };

module.exports = mongoose.model("employee", EmployeeSchema);