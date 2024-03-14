const mongoose = require("mongoose");
const router = require("express").Router();
const AssignWork = mongoose.model("assignWork");

router.post("/add-work", async function (req, res) {
  try {
    const orderFrom = req.body.selectedOrderFrom;
    const materialType = req.body.selectedMaterialType;
    const projectName = req.body.selectedProjectName;
    const startDate = req.body.startDate;
    const date = req.body.date;
    const shift = req.body.shift;
    const pieces = req.body.pieces;
    await AssignWork.create({
      orderFrom,
      materialType,
      projectName,
      startDate,
      date,
      shift,
      pieces,
    });
    res.json({ message: "Work Assigned" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-work", async function (req, res) {
  var work = await AssignWork.find().sort({ _id: -1 });
  res.status(200).json({ work: work });
});

router.delete("/remove-work/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await AssignWork.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
