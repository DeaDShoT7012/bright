let mongoose = require("mongoose");


let WorkSupervisionSchema = mongoose.Schema({

    projectName:{
        type:String
    },
    subProject:{
        type:String
    },
    topology:{
        type:String
    },
    supervisorName:{
        type:String
    },
    quantity:{
        type:String
    },
    process:{
        type:String
    },
    remark:{
        type:String
    },
    createdAt: { type: Date, default: Date.now }, 

})



module.exports = mongoose.model("workSupervision", WorkSupervisionSchema);