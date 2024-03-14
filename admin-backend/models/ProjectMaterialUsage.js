let mongoose = require("mongoose");


let ProjectMaterialUsageSchema = mongoose.Schema({

    projectName:{
        type:String
    },
    subProject:{
        type:String
    },
    topology:{
        type:String
    },
    materialType:{
        type:String
    },
    materialUsed:{
        type:String
    },
    qtyUsed:{
        type:String
    },
    pieces:{
        type:String
    },
    stock:{
        type:String
    },
    shift:{
        type:String
    },
    employeeName:{
        type:String
    },
    remark:{
        type:String
    },
    date:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    }
})



module.exports = mongoose.model("projectMaterialUsage", ProjectMaterialUsageSchema);