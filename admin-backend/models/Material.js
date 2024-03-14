let mongoose = require("mongoose");

let MaterialSchema = mongoose.Schema({
    materialType:{
        type:String
    },
    materialName:{
        type:String
    },
    specification:{
        type:String
    },
    parameter:{
        type:String
    },
})

module.exports = mongoose.model("material", MaterialSchema);