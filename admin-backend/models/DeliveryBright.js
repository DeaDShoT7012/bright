let mongoose = require("mongoose");
 
let DeliveryBrightSchema = mongoose.Schema({

    projectName:{
        type:String
    },
    subProject:{
        type:String
    },
    topology:{
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

module.exports = mongoose.model("deliveryBright", DeliveryBrightSchema);