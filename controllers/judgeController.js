// const User = require("../models/User")

// // Add Judge
// exports.addJudge = async (req, res) => {
//   try {

//     const { name, email, password, events } = req.body

//     const judge = new User({
//       name,
//       email,
//       password,
//       role: "judge",
//       assignedEvents: events || []
//     })

//     await judge.save()

//     res.json(judge)

//   } catch (error) {

//     res.status(500).json({ error: error.message })

//   }
// }


// // Get Judges
// exports.getJudges = async(req,res)=>{

// try{

// const judges = await User
// .find({ role: "judge" })
// .populate("assignedEvents")   // IMPORTANT FIX

// res.json(judges)

// }catch(err){

// console.log(err)

// res.status(500).json({
// message:"Error fetching judges"
// })

// }

// }

// // Delete Judge
// exports.deleteJudge = async (req, res) => {
//   try {

//     await User.findByIdAndDelete(req.params.id)

//     res.json({ message: "Judge deleted successfully" })

//   } catch (error) {

//     res.status(500).json({ error: error.message })

//   }
// }


// const User = require("../models/User")

// /* ADD JUDGE */

// exports.addJudge = async (req, res) => {

// try{

// const { name, email, password, events, assignedParticipants } = req.body

// const judge = new User({
// name,
// email,
// password,
// role:"judge",
// assignedEvents: events || [],
// assignedParticipants: assignedParticipants || []
// })

// await judge.save()

// res.json(judge)

// }catch(err){

// console.log(err)

// res.status(500).json({
// message:"Error creating judge"
// })

// }

// }



// /* GET ALL JUDGES */

// exports.getJudges = async(req,res)=>{

// try{

// const judges = await User
// .find({ role:"judge" })
// .populate("assignedEvents")
// .populate("assignedParticipants")

// res.json(judges)

// }catch(err){

// console.log(err)

// res.status(500).json({
// message:"Error fetching judges"
// })

// }

// }



// /* GET SINGLE JUDGE */

// exports.getJudge = async(req,res)=>{

// try{

// const judge = await User
// .findById(req.params.id)
// .populate("assignedEvents")
// .populate("assignedParticipants")

// res.json(judge)

// }catch(err){

// console.log(err)

// res.status(500).json({
// message:"Error fetching judge"
// })

// }

// }



// /* UPDATE JUDGE */

// exports.updateJudge = async(req,res)=>{

// try{

// const {id} = req.params
// const {name,email,password,events,assignedParticipants} = req.body

// const judge = await User.findByIdAndUpdate(
// id,
// {
// name,
// email,
// password,
// assignedEvents:events,
// assignedParticipants:assignedParticipants
// },
// {new:true}
// )

// res.json(judge)

// }catch(err){

// console.log(err)

// res.status(500).json({
// message:"Error updating judge"
// })

// }

// }



// /* DELETE JUDGE */

// exports.deleteJudge = async(req,res)=>{

// try{

// await User.findByIdAndDelete(req.params.id)

// res.json({
// message:"Judge deleted successfully"
// })

// }catch(err){

// res.status(500).json({
// message:"Error deleting judge"
// })

// }

// }


const User = require("../models/User")

/* ===============================
   ADD JUDGE
================================ */

exports.addJudge = async (req, res) => {

try{

const { name, email, password, events, assignedParticipants } = req.body

const judge = new User({
name,
email,
password,
role:"judge",
assignedEvents: events || [],
assignedParticipants: assignedParticipants || []
})

await judge.save()

res.json(judge)

}catch(err){

console.log(err)

res.status(500).json({
message:"Error creating judge"
})

}

}


/* ===============================
   GET ALL JUDGES
================================ */

exports.getJudges = async(req,res)=>{

try{

const judges = await User
.find({ role:"judge" })
.populate("assignedEvents")
.populate("assignedParticipants")

res.json(judges)

}catch(err){

console.log(err)

res.status(500).json({
message:"Error fetching judges"
})

}

}


/* ===============================
   GET SINGLE JUDGE
================================ */

exports.getJudge = async(req,res)=>{

try{

const judge = await User
.findById(req.params.id)
.populate("assignedEvents")
.populate("assignedParticipants")

res.json(judge)

}catch(err){

console.log(err)

res.status(500).json({
message:"Error fetching judge"
})

}

}


/* ===============================
   GET JUDGES OF EVENT
================================ */

exports.getJudgesByEvent = async(req,res)=>{

try{

const {eventId} = req.params

const judges = await User.find({
role:"judge",
assignedEvents:eventId
})

res.json(judges)

}catch(err){

console.log(err)

res.status(500).json({
message:"Error fetching judges for event"
})

}

}


/* ===============================
   UPDATE JUDGE
================================ */

exports.updateJudge = async(req,res)=>{

try{

const {id} = req.params
const {name,email,password,events,assignedParticipants} = req.body

const judge = await User.findByIdAndUpdate(
id,
{
name,
email,
password,
assignedEvents:events,
assignedParticipants:assignedParticipants
},
{new:true}
)

res.json(judge)

}catch(err){

console.log(err)

res.status(500).json({
message:"Error updating judge"
})

}

}


/* ===============================
   DELETE JUDGE
================================ */

exports.deleteJudge = async(req,res)=>{

try{

await User.findByIdAndDelete(req.params.id)

res.json({
message:"Judge deleted successfully"
})

}catch(err){

res.status(500).json({
message:"Error deleting judge"
})

}

}