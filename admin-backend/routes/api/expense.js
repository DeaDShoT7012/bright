const mongoose = require("mongoose");
const router = require("express").Router();
const PaintProject = mongoose.model("paintProject");
const Project = mongoose.model("project");

router.post("/add-expense", async function (req, res) {
  const _id = req.body.selectedProjectName;
  const expense = req.body.expense;
  const purpose = req.body.purpose;
  const date = req.body.date;
  try {
    const paintProject = await PaintProject.findById(_id);

    if (paintProject) {
      await PaintProject.findByIdAndUpdate(_id, { expense });
    } else {
      const project = await Project.findById(_id);

      if (project) {
        await Project.findByIdAndUpdate(_id, { expense });
      } else {
        return res.status(404).json({ message: "Project not found" });
      }
    }
    res.status(200).json({ message: "Expense added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
