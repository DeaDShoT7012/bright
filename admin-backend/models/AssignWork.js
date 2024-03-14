let mongoose = require("mongoose");
 
let AssignWorkSchema = mongoose.Schema({

    orderFrom:{
        type:String
    },
    materialType:{
        type:String
    },
    projectName:{
        type:String
    },
    startDate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "startDate",
    },
    date:{
        type:String
    },
    shift:{
        type:String
    },
    pieces:{
        type:String
    },
})

module.exports = mongoose.model("assignWork", AssignWorkSchema);