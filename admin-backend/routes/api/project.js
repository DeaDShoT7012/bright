const mongoose = require("mongoose");
const router = require("express").Router();
const Project = mongoose.model("project");

router.post("/add-project", async function (req, res) {
  try {
    const projectName = req.body.projectName;
    const customer = req.body.customer;
    const deadline = req.body.deadline;
    const expQuantity = req.body.expQuantity;
    const alertDate = req.body.alertDate;
    await Project.create({
      projectName,
      customer,
      deadline,
      expQuantity,
      alertDate,
    });
    res.json({ message: "Project created" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/get-project", async function (req, res) {
//   var project = await Project.find().sort({ _id: -1 });
//   res.status(200).json({ project: project });
// });
router.get('/get-project', async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const project = await Project.find({
      $or: [
        { projectName: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ _id: -1 });
    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/edit-project/:id", async function (req, res) {
  const { id } = req.params;
  var project = await Project.findOne({ _id: id });
  res.status(200).json({ project: project });
});

router.post("/update-project/:id", async function (req, res) {
  const { id } = req.params;
  const projectName = req.body.projectName;
  const customer = req.body.customer;
  const deadline = req.body.deadline;
  const expQuantity = req.body.expQuantity;
  const alertDate = req.body.alertDate;
  await Project.findByIdAndUpdate(id, {
    projectName,
    customer,
    deadline,
    expQuantity,
    alertDate,
  });
  res.status(200).json({ message: "Project updated" });
});

router.delete("/remove-project/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await Project.deleteOne({ _id: id });
    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove-sub-project/:id/:sid", async function (req, res) {
  try {
    const { id, sid } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const subProjectIndex = project.subProjectList.findIndex(
      (subProject) => subProject._id == sid
    );

    if (subProjectIndex === -1) {
      return res.status(404).json({ message: "Sub-project not found" });
    }
    project.subProjectList.splice(subProjectIndex, 1);
    await project.save();
    res.status(200).json({ message: "Sub-project Deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-sub-project/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const subProject = req.body.sname;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.subProjectList.push({ subProject });
    await project.save();
    res.json({ message: "SubProject Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-sub-project/:id", async function (req, res) {
  const { id } = req.params;
  var project = await Project.findOne({ _id: id });
  res.status(200).json({ project: project });
});

router.post("/add-topology/:id/:sid", async function (req, res) {
  try {
    const { id } = req.params;
    const { sid } = req.params;
    const topologyName = req.body.topologyName;
    const specification = req.body.specification;
    const deadline = req.body.deadline;
    const cost = req.body.cost;
    const deadlineAlert = req.body.deadlineAlert;
    const expQty = req.body.expQty;
    const width = req.body.width;
    const height = req.body.height;
    const quantity = req.body.quantity;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const subProject = project.subProjectList.find(
      (subProj) => subProj._id.toString() === sid
    );
    if (!subProject) {
      return res.status(404).json({ error: "Sub-project not found" });
    }
    const newTopology = {
      topologyName,
      specification,
      deadline,
      cost,
      deadlineAlert,
      expQty,
      width,
      height,
      quantity,
    };
    subProject.topologyList.push(newTopology);
    await project.save();
    res.json({ message: "Topology created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-topology/:id/:sid", async function (req, res) {
  const { id } = req.params;
  const { sid } = req.params;
  var project = await Project.findOne({ _id: id });
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  const subProject = project.subProjectList.find(
    (subProj) => subProj._id.toString() === sid
  );
  if (!subProject) {
    return res.status(404).json({ error: "Sub-project not found" });
  }
  res.status(200).json({ topologyList: subProject.topologyList });
});

router.delete("/remove-topology/:id/:sid/:tid", async function (req, res) {
  try {
    const { id, sid, tid } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const subProject = project.subProjectList.find(
      (subProj) => subProj._id == sid
    );

    if (!subProject) {
      return res.status(404).json({ message: "Sub-project not found" });
    }

    const topologyIndex = subProject.topologyList.findIndex(
      (topology) => topology._id == tid
    );

    if (topologyIndex === -1) {
      return res.status(404).json({ message: "Topology not found" });
    }

    subProject.topologyList.splice(topologyIndex, 1);
    await project.save();
    res.status(200).json({ message: "Topology Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/edit-topology/:id/:sid/:tid", async function (req, res) {
  try {
    const { id } = req.params;
    const { sid } = req.params;
    const { tid } = req.params;
    var project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const subProject = project.subProjectList.find(
      (subProj) => subProj._id.toString() === sid
    );
    if (!subProject) {
      return res.status(404).json({ error: "Sub-project not found" });
    }
    const topology = subProject.topologyList.find(
      (top) => top._id.toString() === tid
    );

    if (!topology) {
      return res.status(404).json({ error: "Topology not found" });
    }
    res.status(200).json({ topology });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update-topology/:id/:sid/:tid", async function (req, res) {
  try {
    const { id, sid, tid } = req.params;
    const {
      topologyName,
      specification,
      deadline,
      cost,
      deadlineAlert,
      expQty,
      width,
      height,
      quantity,
    } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const subProject = project.subProjectList.find(
      (subProj) => subProj._id.toString() === sid
    );
    if (!subProject) {
      return res.status(404).json({ error: "Sub-project not found" });
    }
    const topology = subProject.topologyList.find(
      (top) => top._id.toString() === tid
    );
    if (!topology) {
      return res.status(404).json({ error: "Topology not found" });
    }

    topology.topologyName = topologyName;
    topology.specification = specification;
    topology.deadline = deadline;
    topology.cost = cost;
    topology.deadlineAlert = deadlineAlert;
    topology.expQty = expQty;
    topology.width = width;
    topology.height = height;
    topology.quantity = quantity;

    await project.save();
    res.json({ message: "Topology Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
