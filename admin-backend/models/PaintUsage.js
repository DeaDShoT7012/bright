let mongoose = require("mongoose");

let PaintUsageSchema = mongoose.Schema({

    paintName:{
        type:String
    },
    paintCode:{
        type:String
    },
    paintColor:{
        type:String
    },
    currentStock:{
        type:String
    },
    paintIntake:{
        type:String
    },
    paintLeftout:{
        type:String
    },
    createdAt: { type: Date, default: Date.now }, 
})

module.exports = mongoose.model("paintUsage", PaintUsageSchema);