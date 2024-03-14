const mongoose = require("mongoose");
const router = require("express").Router();
const Inventory = mongoose.model("inventory");
const PaintMaterial = mongoose.model("paintMaterial");
const MaterialType = mongoose.model("materialType");
const Material = mongoose.model("material");

router.post("/add", async function (req, res) {
  try {
    const paintName = req.body.paintName;
    const paintCode = req.body.paintCode;
    const paintColor = req.body.paintColor;
    const price = req.body.price;
    const initialStock = req.body.initialStock;
    const alertThreshold = req.body.alertThreshold;
    await Inventory.create({
      paintName,
      paintCode,
      paintColor,
      price,
      initialStock,
      alertThreshold,
    });
    res.json({ message: "Inventory created" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get", async function (req, res) {
//   var inventory = await Inventory.find().sort({ _id: -1 });
//   res.status(200).json({ inventory: inventory });
// });
router.get('/get', async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const inventory = await Inventory.find({
      $or: [
        { paintName: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ _id: -1 });
    res.status(200).json({ inventory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/edit-paint/:id", async function (req, res) {
  const { id } = req.params;
  var inventory = await Inventory.findOne({ _id: id });
  res.status(200).json({ inventory: inventory });
});

router.post("/update-paint/:id", async function (req, res) {
  const { id } = req.params;
  const paintName = req.body.paintName;
  const paintCode = req.body.paintCode;
  const paintColor = req.body.paintColor;
  const price = req.body.price;
  const initialStock = req.body.initialStock;
  const alertThreshold = req.body.alertThreshold;
  const additionalStock = req.body.additionalStock;
  await Inventory.findByIdAndUpdate(id, {
    paintName,
    paintCode,
    paintColor,
    price,
    initialStock,
    alertThreshold,
    additionalStock,
  });
  res.status(200).json({ message: "paint updated" });
});

router.post("/add-paint-material", async function (req, res) {
  try {
    const materialType = req.body.materialType;
    const perimeter = req.body.perimeter;
    const materialPrice = req.body.materialPrice;
    const description = req.body.description;
    await PaintMaterial.create({
      materialType,
      perimeter,
      materialPrice,
      description,
    });
    res.json({ message: "PaintMaterial created" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-paint-material", async function (req, res) {
//   try {
//     var paintMaterial = await PaintMaterial.find().sort({ _id: -1 });
//     res.status(200).json({ paintMaterial: paintMaterial });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
router.get('/get-paint-material', async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const paintMaterial = await PaintMaterial.find({
      $or: [
        { materialType: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ _id: -1 });
    res.status(200).json({ paintMaterial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/edit-paint-material/:id", async function (req, res) {
  const { id } = req.params;
  var inventory = await PaintMaterial.findOne({ _id: id });
  res.status(200).json({ inventory: inventory });
});

router.post("/update-paint-material/:id", async function (req, res) {
  const { id } = req.params;
  const materialType = req.body.materialType;
  const perimeter = req.body.perimeter;
  const materialPrice = req.body.materialPrice;
  const description = req.body.description;
  await PaintMaterial.findByIdAndUpdate(id, {
    materialType,
    perimeter,
    materialPrice,
    description,
  });
  res.status(200).json({ message: "paintMaterial updated" });
});

router.delete("/remove-paint-material/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await PaintMaterial.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove-paint/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await Inventory.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-material-type", async function (req, res) {
  try {
    const materialType = req.body.materialType;

    await MaterialType.create({
      materialType,
    });
    res.json({ message: "MaterialType created" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-material-type", async function (req, res) {
//   var materialType = await MaterialType.find();
//   res.status(200).json({ materialType: materialType });
// });
router.get('/get-material-type', async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const materialType = await MaterialType.find({
      $or: [
        { materialType: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ _id: -1 });
    res.status(200).json({ materialType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/edit-material-type/:id", async function (req, res) {
  try {
    const { id } = req.params;
    var materialType = await MaterialType.findOne({ _id: id });
    res.status(200).json({ materialType: materialType });
  } catch (error) {
    console.log(error);
  }
});

router.post("/update-material-type/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const materialType = req.body.materialType;
    await MaterialType.findByIdAndUpdate(id, {
      materialType,
    });
    res.json({ message: "MaterialType created" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove-material-type/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await MaterialType.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-material", async function (req, res) {
  try {
    const materialType = req.body.materialType;
    const materialName = req.body.materialName;
    const specification = req.body.specification;
    const parameter = req.body.parameter;
    await Material.create({
      materialType,
      materialName,
      specification,
      parameter,
    });
    res.json({ message: "Material created" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-material", async function (req, res) {
//   var material = await Material.find().sort({ _id: -1 });
//   res.status(200).json({ material: material });
// });
router.get("/get-material", async function (req, res) {
  const materialName = req.query.materialName || "";
  const materialType = req.query.materialType || "";

  const material = await Material.find({
    materialName: { $regex: materialName, $options: "i" },
    materialType: { $regex: materialType, $options: "i" },
  }).sort({ _id: -1 });

  res.status(200).json({ material: material });
});

router.get("/edit-material/:id", async function (req, res) {
  const { id } = req.params;
  var inventory = await Material.findOne({ _id: id });
  res.status(200).json({ inventory: inventory });
});

router.post("/update-material/:id", async function (req, res) {
  const { id } = req.params;
  const materialType = req.body.materialType;
  const materialName = req.body.materialName;
  const specification = req.body.specification;
  const parameter = req.body.parameter;
  await Material.findByIdAndUpdate(id, {
    materialType,
    materialName,
    specification,
    parameter,
  });
  res.status(200).json({ message: "material updated" });
});

router.delete("/remove-material/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await Material.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
