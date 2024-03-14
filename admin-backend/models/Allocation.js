let mongoose = require("mongoose");

let AllocationSchema = mongoose.Schema({

    projectName:{
        type:String
    },
    subProject:{
        type:String
    },
    topology:{
        type:String
    },
    quantity:{
        type:String
    },
    allocation:{
        type:String
    },
    completion:{
        type:String
    },

})

module.exports = mongoose.model("allocation", AllocationSchema);