let mongoose = require("mongoose");

let TentativeWorkSchema = mongoose.Schema({

    date:{
        type:String
    },
    shift:{
        type:String
    },
    paintColor:{
        type:String
    },
    description:{
        type:String
    },
})

module.exports = mongoose.model("tentativeWork", TentativeWorkSchema);