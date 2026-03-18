const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({

name: String,

description: String,

criteria:[
{
name:String,
maxMarks:Number
}
],

roundBased:{
type:Boolean,
default:false
},

rounds:{
type:Number,
default:1
}

})

module.exports = mongoose.model("Event",eventSchema)