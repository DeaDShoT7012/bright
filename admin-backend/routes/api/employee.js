const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const Employee = mongoose.model("employee");

router.post("/add-employee", async function (req, res) {
  try {
    const name = req.body.name;
    const address = req.body.address;
    const date = req.body.date;
    const designation = req.body.designation;
    var password = req.body.password;
    const confirmPswd = req.body.confirmPswd;
    if (confirmPswd != password) {
      res.status(400).json({ message: "Password not Matched" });
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
              var newUser = new Employee({
                name,
                address,
                date,
                designation,
                password,
              });
              newUser.save();
              res.status(200).json({ message: "Employee Created" });
            }
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-employee", async function (req, res) {
//   var employee = await Employee.find().sort({ _id: -1 });
//   res.status(200).json({ employee: employee });
// });
router.get('/get-employee', async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const employee = await Employee.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ _id: -1 });
    res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/edit-employee/:id", async function (req, res) {
    const { id } = req.params;
    var employee = await Employee.findOne({ _id: id });
    res.status(200).json({ employee: employee });
});

router.post("/update-employee/:id", async function (req, res) {
    try{    
    const { id } = req.params;
    const name = req.body.name;
    const address = req.body.address;
    const date = req.body.date;
    const designation = req.body.designation;
    var password = req.body.password;
    const confirmPswd = req.body.confirmPswd;

    if (confirmPswd != password) {
        res.status(400).json({ message: "Password not Matched" });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            throw err;
          } else {
            bcrypt.hash(password, salt,async function (err, hash) {
              if (err) {
                throw err;
              } else {
                password = hash;
                await Employee.findByIdAndUpdate(id, {
                    name,
                    address,
                    date,
                    designation,
                    password,  
                });
                res.status(200).json({ message: "Paint Project updated" });
              }
            });
          }
        });
      }
    }
    catch(error){
    console.log(error);
    }
  });

  router.delete("/remove-employee/:id", async function (req, res) {
    try {
      const { id } = req.params;
      await Employee.deleteOne({ _id: id });
      res.status(200).json({ message: "Item Deleted" });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
