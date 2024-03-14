const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path=require("path");

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "public")));
// mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MOONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });



const db = mongoose.connection;
db.once("open", () => console.log('\x1b[32m%s\x1b[0m', "DB Connected Successfully!!"))
db.on("error", (err) => console.log('\x1b[31m%s\x1b[0m', "Connection Error", err))


require("./models/Inventory");
require("./models/PaintMaterial")
require("./models/MaterialType")
require("./models/Material")
require("./models/Project")
require("./models/TentativeWork")
require("./models/User")
require("./models/PaintProject")
require("./models/Employee")
require("./models/AssignWork")
require("./models/ProjectMaterialUsage")
require("./models/PaintUsage")
require("./models/Allocation")
require("./models/DeliverPaint")
require("./models/DeliveryBright")
require("./models/WorkSupervision")


app.use(require("./routes"));

process.on("uncaughtException", (err) => console.log('\x1b[31m%s\x1b[0m', "Uncaught Exception Error =>\n", err));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const message = err.message || err;
  res.json({
    errors: {
      message: message,
      error: true,
    },
  });
});

const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log("Listening at http://localhost:%s \n" + "\x1b[33m" + "Waiting for DB Connection..." + "\x1b[0m", port);
  });
