let mongoose = require("mongoose");

let InventorySchema = mongoose.Schema({
    paintName:{
        type:String
    },
    paintCode:{
        type:String
    },
    paintColor:{
        type:String
    },
    price:{
        type:String
    },
    initialStock:{
        type:String
    },
    alertThreshold:{
        type:String
    },
    additionalStock:{
        type:String   
    }

})

module.exports = mongoose.model("inventory", InventorySchema);