// const mongoose = require("mongoose")

// const UserSchema = new mongoose.Schema({

// name: String,

// email: String,

// password: String,

// role: {
// type: String,
// default: "judge"
// },

// assignedEvents: [
// {
// type: mongoose.Schema.Types.ObjectId,
// ref: "Event"
// }
// ]

// })

// module.exports = mongoose.model("User", UserSchema)

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

password:{
type:String,
required:true
},

role:{
type:String,
enum:["admin","judge","coordinator"],
default:"judge"
},

assignedEvents:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"Event"
}
],

/* NEW FEATURE */

assignedParticipants:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"Participant"
}
]

})

module.exports = mongoose.model("User",UserSchema)