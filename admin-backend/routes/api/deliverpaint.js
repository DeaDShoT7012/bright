const mongoose = require("mongoose");
const router = require("express").Router();
const DeliverPaint = mongoose.model("deliverPaint");
const Employee = mongoose.model("employee");
const DeliveryBright = mongoose.model("deliveryBright");

router.post("/add-delivery", async function (req, res) {
  try {
    const orderFrom = req.body.selectedOrderFrom;
    const materialType = req.body.selectedMaterialType;
    const projectName = req.body.selectedProjectName;
    const startDate = req.body.startDate;
    const documentNo = req.body.documentNo;
    const quantity = req.body.quantity;
    const vehicleNo = req.body.vehicleNo;
    const paintName = req.body.paintName;
    const remark = req.body.remark;
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await Employee.findOne({ name: userName });
    if (!user) {
      res.status(500).json({ message: "User not found" });
    } else {
      user.checkPassword(password, async function (err, result) {
        if (result) {
          console.log("err", result);
        }
        if (result) {
          await DeliverPaint.create({
            orderFrom,
            materialType,
            projectName,
            startDate,
            documentNo,
            quantity,
            vehicleNo,
            paintName,
            remark,
            userName,
          });
          res.json({ message: "delivery created" });
        } else {
          res.status(400).json({ message: "Incorrect password" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});



// router.get("/get-delivery", async function (req, res) {
//   var work = await DeliverPaint.find().sort({ _id: -1 });
//   res.status(200).json({ work: work });
// });
router.get("/get-delivery", async function (req, res) {
  try {
    const projectName = req.query.projectName || "";
    const materialType = req.query.materialType || "";
    const orderFrom = req.query.orderFrom || "";
    const paintName = req.query.paintName || '';
    const createdAt = req.query.createdAt || '';
    let query = {};
    if (projectName) {
      query.projectName = { $regex: new RegExp(projectName, 'i') };
    }
    if (materialType) {
      query.materialType = { $regex: new RegExp(materialType, 'i') };
    }
    if (orderFrom) {
      query.orderFrom = { $regex: new RegExp(orderFrom, 'i') };
    }
    if (paintName) {
      query.paintName = { $regex: new RegExp(paintName, 'i') };
    }
    if (createdAt) {
      const startDate = new Date(createdAt);
      const endDate = new Date(createdAt + 'T23:59:59.999Z');
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    const work = await DeliverPaint.find(query).sort({ _id: -1 });
   res.status(200).json({ work: work });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/remove-delivery-paint/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await DeliverPaint.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});



router.post("/add-delivery-bright", async function (req, res) {
  try {
    const projectName = req.body.selectedProject;
    const subProject = req.body.selectedSubProject;
    const topology = req.body.topology;
    const documentNo = req.body.documentNo;
    const quantity = req.body.quantity;
    const vehicleNo = req.body.vehicleNo;
    const paintName = req.body.paintName;
    const remark = req.body.remark;
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await Employee.findOne({ name: userName });
    if (!user) {
      res.status(500).json({ message: "User not found" });
    } else {
      user.checkPassword(password, async function (err, result) {
        if (result) {
          console.log("err", result);
        }
        if (result) {
          await DeliveryBright.create({
            projectName,
            subProject,
            topology,
            documentNo,
            quantity,
            vehicleNo,
            paintName,
            remark,
            userName,
          });
          res.json({ message: "delivery created" });
        } else {
          res.status(400).json({ message: "Incorrect password" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-delivery-bright", async function (req, res) {
  var work = await DeliveryBright.find().sort({ _id: -1 });
  res.status(200).json({ work: work });
});

router.delete("/remove-delivery-bright/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await DeliveryBright.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
