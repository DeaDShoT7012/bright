const mongoose = require("mongoose");
const router = require("express").Router();
const PaintUsage = mongoose.model("paintUsage");
const Employee = mongoose.model("employee");


router.post("/add-paintUsage", async function (req, res) {
  try {
    const paintName = req.body.paintName;
    const paintCode = req.body.paintCode;
    const paintColor = req.body.paintColor;
    const currentStock = req.body.currentStock;
    const paintIntake = req.body.paintIntake;
    const paintLeftout = req.body.paintLeftout;
    await PaintUsage.create({
      paintName,
      paintCode,
      paintColor,
      currentStock,
      paintIntake,
      paintLeftout,
    });
    res.json({ message: "paintUsage created" });
  } catch (error) {
    console.log(error);
  }
});


// router.get("/get-paintUsage", async function (req, res) {
//   var paint = await PaintUsage.find().sort({ _id: -1 });
//   res.status(200).json({ paint: paint });
// });
router.get("/get-paintUsage", async function (req, res) {
  try {
    const paintKey = req.query.paintName || "";
    const createdAt = req.query.createdAt || '';
    console.log(paintKey);
    
    let query = {};
    
    if (paintKey) {
      // Splitting the paintKey into paintName, paintCode, and paintColor
      const [paintName, paintCode, paintColor] = paintKey.split('-');     
      // Adding conditions for paintName, paintCode, and paintColor to the query
      if (paintName) query.paintName = { $regex: new RegExp(paintName, 'i') };
      if (paintCode) query.paintCode = { $regex: new RegExp(paintCode, 'i') };
      if (paintColor) query.paintColor = { $regex: new RegExp(paintColor, 'i') };
    }
    if (createdAt) {
      const startDate = new Date(createdAt);
      const endDate = new Date(createdAt + 'T23:59:59.999Z');
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    const paint = await PaintUsage.find(query).sort({ _id: -1 });
    res.status(200).json({ paint: paint });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/remove-paintUsage/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await PaintUsage.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/supervisor-login", async function (req, res) {
  try {
    var employeeName = req.body.employeeName;
      var password = req.body.password;
        console.log(req.body);
      const employee = await Employee.findOne({_id:employeeName})
      if (!employee) {
          res.status(500).json({ message: "User not found" });
        }else{
          employee.checkPassword(password,async function (err, result) {
              if (result) {
                console.log('err',result);
                res.json({ message: " employee found" });   
              }
             else {
                res.status(400).json({ message: "Incorrect password" });
              }
            });
        } 
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
