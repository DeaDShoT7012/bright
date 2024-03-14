const mongoose = require("mongoose");
const router = require("express").Router();
const TentativeWork = mongoose.model("tentativeWork");

router.post("/add-work", async function (req, res) {
    try {
      const date = req.body.date;
      const shift = req.body.shift;
      const paintColor = req.body.paintColor;
      const description = req.body.description;
      await TentativeWork.create({
        date,
        shift,
        paintColor,
        description,
      });
      res.json({ message: "Work created" });
    } catch (error) {
      console.log(error);
    }
  });

  // router.get("/get-work", async function (req, res) {
  //   var work = await TentativeWork.find().sort({ _id: -1 });
  //   res.status(200).json({ work: work });
  // });
  router.get('/get-work', async (req, res) => {
    try {
      const date = req.query.date || '';
      const work = await TentativeWork.find({
        $or: [
          { date: { $regex: date, $options: 'i' } }
        ]
      }).sort({ _id: -1 });
      res.status(200).json({ work });
    } catch (error) {
      console.error(error);``
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get("/edit-work/:id", async function (req, res) {
    const { id } = req.params;
    var work = await TentativeWork.findOne({ _id: id });
    res.status(200).json({ work: work });
  });

  router.post("/update-work/:id", async function (req, res) {
    const { id } = req.params;
    const date = req.body.date;
    const shift = req.body.shift;
    const paintColor = req.body.paintColor;
    const description = req.body.description;
    await TentativeWork.findByIdAndUpdate(id, {
        date,
        shift,
        paintColor,
        description,
    });
    res.status(200).json({ message: "Work updated" });
  });

  router.delete("/remove-work/:id", async function (req, res) {
    try {
      const { id } = req.params;
      await TentativeWork.deleteOne({ _id: id });
      res.status(200).json({ message: "Item Deleted" });
    } catch (error) {
      console.log(error);
    }
  });




module.exports = router;
