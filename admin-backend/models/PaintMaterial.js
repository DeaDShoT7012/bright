let mongoose = require("mongoose");

let PaintMaterialSchema = mongoose.Schema({

    materialType:{
        type:String
    },
    perimeter:{
        type:String
    },
    materialPrice:{
        type:String
    },
    description:{
        type:String
    }
})

module.exports = mongoose.model("paintMaterial", PaintMaterialSchema);