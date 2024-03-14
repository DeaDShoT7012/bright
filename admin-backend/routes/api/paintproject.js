const mongoose = require("mongoose");
const router = require("express").Router();
const PaintProject = mongoose.model("paintProject");
const PaintMaterial = mongoose.model("paintMaterial");
const Employee = mongoose.model("employee");
var auth = require("../../libs/auth");



router.post("/add-paint-project", async function (req, res) {
  try {
    const {
      orderFrom,
      materialType,
      projectName,
      pieces,
      pieceLength,
      pieceSign,
    } = req.body;
    await PaintProject.create({
      orderFrom,
      materialType,
      projectName,
      pieces,
      pieceLength,
      pieceSign,
    });
    res.json({ message: "Paint Project created" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-paint-project", async function (req, res) {
//   var project = await PaintProject.find().sort({ _id: -1 });
//   res.status(200).json({ project: project });
// });
router.get("/get-paint-project", async function (req, res) {
  try {
    const projectName = req.query.projectName || "";
    const materialType = req.query.materialType || "";
    const orderFrom = req.query.orderFrom || "";
    const createdAt = req.query.createdAt || '';
    let query = {};
    if (projectName) {
      query.projectName = { $regex: new RegExp(projectName, 'i') };
    }
    if (materialType) {
      query.materialType = materialType;
    }
    if (orderFrom) {
      query.orderFrom = { $regex: new RegExp(orderFrom, 'i') };
    }
    if (createdAt) {
      // Assuming createdAt is a specific date in the format 'YYYY-MM-DD'
      const startDate = new Date(createdAt);
      const endDate = new Date(createdAt + 'T23:59:59.999Z'); // Assuming end of the day
      // Query for a range between startDate and endDate
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    const project = await PaintProject.find(query).sort({ _id: -1 });
   res.status(200).json({ project: project });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/edit-paint-project/:id", async function (req, res) {
  const { id } = req.params;
  var project = await PaintProject.findOne({ _id: id });
  res.status(200).json({ project: project });
});

router.post("/update-paint-project/:id", async function (req, res) {
  const { id } = req.params;
  const {
    orderFrom,
    materialType,
    projectName,
    pieces,
    pieceLength,
    pieceSign,
  } = req.body;
  await PaintProject.findByIdAndUpdate(id, {
    orderFrom,
    materialType,
    projectName,
    pieces,
    pieceLength,
    pieceSign,
  });
  res.status(200).json({ message: "Paint Project updated" });
});

router.delete("/remove-paint-project/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await PaintProject.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});


router.get("/get-paint-material/:mid", async function (req, res) {
  const mid= req.params.mid
  var project = await PaintMaterial.findOne({ _id: mid });
  res.status(200).json({ project: project });
});

router.post("/add-log/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const paint = req.body.paintName;
    const noPieces = req.body.pieces;
    const shift = req.body.shift;
    var employeeName = req.body.employeeName;
    var password = req.body.password;  
    
  const employee = await Employee.findOne({name:employeeName})
  if (!employee) {
      res.status(500).json({ message: "User not found" });
    }else{
      employee.checkPassword(password,async function (err, result) {
          if (result) {
            console.log('err',result);
          }
          if (result) {
             const log = await PaintProject.findById(id)
                if(!log){
                  return res.status(404).json({ error: "project not found" });
                }
                const addDailyLog={
                  paint,
                  noPieces,
                  shift,
                  employeeName
                }
                log.dailyLog.push(addDailyLog)
                await log.save();
              res.json({ message: "Daily log created" });
          } else {
            res.status(400).json({ message: "Incorrect password" });
          }
        });
    } 
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
