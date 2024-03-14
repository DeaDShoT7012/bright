let mongoose = require("mongoose");

let PaintProjectSchema = mongoose.Schema({

    orderFrom:{
        type:String
    },
    materialType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "materialType",
    },
    projectName:{
        type:String
    },
    pieces:{
        type:String
    },
    pieceLength:{
        type:String
    },
    pieceSign:{
        type:String
    },
    expense:{
        type:String
    },
    dailyLog:[
       { 
        paint:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "paintName",
        },
        noPieces:{
            type:String
        },
        employeeName:{
            type:String
        },
        shift:{
            type:String
        },  
        createdAt: { type: Date, default: Date.now },   
    }
    ],
    createdAt: { type: Date, default: Date.now },   
})

module.exports = mongoose.model("paintProject", PaintProjectSchema);