let mongoose = require("mongoose");
 
let MaterialTypeSchema = mongoose.Schema({

    materialType:{
        type:String
    },
})

module.exports = mongoose.model("materialType", MaterialTypeSchema);