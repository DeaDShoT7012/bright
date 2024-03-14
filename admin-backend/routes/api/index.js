const router = require("express").Router();

router.use("/inventory", require("./inventory"));
router.use("/project", require("./project"));
router.use("/tentativework", require("./tentativework"));
router.use("/user", require("./user"));
router.use("/paintproject", require("./paintproject"));
router.use("/employee", require("./employee"));
router.use("/assignwork", require("./assignwork"));
router.use("/projectmaterialusage", require("./projectmaterialusage"));
router.use("/paintusage", require("./paintusage"));
router.use("/allocation", require("./allocation"));
router.use("/deliverpaint", require("./deliverpaint"));
router.use("/expense", require("./expense"));



module.exports = router;

