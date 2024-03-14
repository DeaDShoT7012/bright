let mongoose = require("mongoose");
 
let DeliverPaintSchema = mongoose.Schema({

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
        type:String
    },
    documentNo:{
        type:String
    },
    quantity:{
        type:String
    },
    vehicleNo:{
        type:String
    },
    paintName:{
        type:String
    },
    remark:{
        type:String
    },
    userName:{
        type:String
    },
    password:{
        type:String
    },
    createdAt: { type: Date, default: Date.now }, 
})

module.exports = mongoose.model("deliverPaint", DeliverPaintSchema);