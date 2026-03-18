const mongoose = require("mongoose")

const EvaluationSchema = new mongoose.Schema({

event:{
type:mongoose.Schema.Types.ObjectId,
ref:"Event"
},

participant:{
type:mongoose.Schema.Types.ObjectId,
ref:"Participant"
},

judge:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

scores:[
{
round:{
type:String,
default:null
},
criteria:String,
marks:Number
}
]

})

module.exports = mongoose.model("Evaluation",EvaluationSchema)