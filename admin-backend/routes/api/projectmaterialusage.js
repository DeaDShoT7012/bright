const mongoose = require("mongoose");
const router = require("express").Router();
const ProjectMaterialUsage = mongoose.model("projectMaterialUsage");
const Employee = mongoose.model("employee");
const WorkSupervision = mongoose.model("workSupervision");




router.post("/add-material", async function (req, res) {
    try {
      const projectName = req.body.selectedProject;
      const subProject = req.body.selectedSubProject;
      const topology = req.body.topology;
      const materialType = req.body.selectedMaterialType;
      const materialUsed = req.body.materialSelected;
      const qtyUsed = req.body.qtyUsed;
      const pieces = req.body.pieces;
      const stock = req.body.stock;
      const shift = req.body.shift;
      var employeeName = req.body.employeeName;
      var password = req.body.password;
      const remark = req.body.remark;
      const date = req.body.date;    


    const employee = await Employee.findOne({name:employeeName})
    if (!employee) {
        res.status(500).json({ message: "User not found" });
      }else{
        employee.checkPassword(password,async function (err, result) {
            if (result) {
              console.log('err',result);
            }
            if (result) {
                await ProjectMaterialUsage.create({
                    projectName,
                    subProject,
                    topology,
                    materialType,
                    materialUsed, 
                    qtyUsed,
                    pieces,
                    stock,
                    shift,
                    employeeName,
                    remark,
                    date
                });
                res.json({ message: "Material created" });
            } else {
              res.status(400).json({ message: "Incorrect password" });
            }
          });
      } 
    } catch (error) {
      console.log(error);
    }
  });

// router.get("/get-material", async function (req, res) {
//     var material = await ProjectMaterialUsage.find().sort({ _id: -1 });
//     res.status(200).json({ material: material });
// });
router.get("/get-material", async function (req, res) {
  const projectName = req.query.projectName || "";
  const materialType = req.query.materialType || "";
  const materialUsed = req.query.materialUsed || "";
  const date = req.query.date || "";

  const material = await ProjectMaterialUsage.find({
    projectName: { $regex: projectName, $options: "i" },
    materialType: { $regex: materialType, $options: "i" },
    materialUsed: { $regex: materialUsed, $options: "i" },
    date: { $regex: date, $options: "i" },
  }).sort({ _id: -1 });

  res.status(200).json({ material: material });
});

router.get("/edit-material/:id", async function (req, res) {
  const { id } = req.params;
  var material = await ProjectMaterialUsage.findOne({ _id: id });
  res.status(200).json({ material: material });
});

router.post("/update-material/:id", async function (req, res) {
try { 
  const { id } = req.params;
  const date = req.body.date;
  const qtyUsed = req.body.qtyUsed;
  const pieces = req.body.pieces;
  const stock = req.body.stock;
  await ProjectMaterialUsage.findByIdAndUpdate(id, {
      date,
      qtyUsed,
      pieces,
      stock,
  });
  res.status(200).json({ message: "Material updated" });
}
catch(error){
  console.log(error);
}
});

router.delete("/remove-material/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await ProjectMaterialUsage.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-work-supervision", async function (req, res) {
  try {
    const projectName = req.body.selectedProject;
    const subProject = req.body.selectedSubProject;
    const topology = req.body.topology;
    const supervisorName = req.body.employeeName;
    const remark = req.body.remark;
    const quantity = req.body.quantity;
    const process = req.body.processing;
    const password = req.body.password;

  const employee = await Employee.findOne({name:supervisorName})
  if (!employee) {
      res.status(500).json({ message: "User not found" });
    }else{
      employee.checkPassword(password,async function (err, result) {
          if (result) {
            console.log('err',result);
          }
          if (result) {
              await WorkSupervision.create({
                  projectName,
                  subProject,
                  topology,
                  supervisorName,
                  remark,
                  quantity,
                  process
              });
              res.json({ message: "work created" });
          } else {
            res.status(400).json({ message: "Incorrect password" });
          }
        });
    } 
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-work-supervision", async function (req, res) {
//   var material = await WorkSupervision.find().sort({ _id: -1 });
//   res.status(200).json({ material: material });
// });
router.get("/get-work-supervision", async function (req, res) {
  try {
    const process = req.query.process || "";
    const createdAt = req.query.createdAt || '';
    const searchQuery = req.query.searchQuery || "";
    let query = {};
    if (process) {
      query.process = { $regex: new RegExp(process, 'i') };
    }
    if (createdAt) {
      const startDate = new Date(createdAt);
      const endDate = new Date(createdAt + 'T23:59:59.999Z');
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    if(searchQuery){
      query.projectName={$regex: searchQuery, $options: 'i' }
    }
    const material = await WorkSupervision.find(query).sort({ _id: -1 });
   res.status(200).json({ material: material });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/remove-work-supervision/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await WorkSupervision.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/update-status/:id", async function (req, res) {
  try { 
    const { id } = req.params;
    const status = req.body.verify
    console.log('status',status);
    await ProjectMaterialUsage.findByIdAndUpdate(id, {
      status
    });
    res.status(200).json({ message: "Material updated" });
  }
  catch(error){
    console.log(error);
  }
  });



module.exports = router;
