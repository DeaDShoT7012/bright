const mongoose = require("mongoose");
const router = require("express").Router();
const Allocation = mongoose.model("allocation");

router.post("/add-allocation", async function (req, res) {
  try {
    const projectName = req.body.selectedProject;
    const subProject = req.body.selectedSubProject;
    const topology = req.body.topology;
    const quantity = req.body.quantity;
    const allocation = req.body.allocation;
    const completion = req.body.completion;
    await Allocation.create({
      projectName,
      subProject,
      topology,
      quantity,
      allocation,
      completion,
    });
    res.json({ message: "Allocation created" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-allocation", async function (req, res) {
//   var allocation = await Allocation.find().sort({ _id: -1 });
//   res.status(200).json({ allocation: allocation });
// });
router.get('/get-allocation', async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const allocation = await Allocation.find({
      $or: [
        { projectName: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ _id: -1 });
    res.status(200).json({ allocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/remove-allocation/:id", async function (req, res) {
    try {
      const { id } = req.params;
      await Allocation.deleteOne({ _id: id });
      res.status(200).json({ message: "Item Deleted" });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
