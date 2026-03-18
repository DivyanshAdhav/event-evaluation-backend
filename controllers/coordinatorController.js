const User = require("../models/User")

/* Add Coordinator */

exports.addCoordinator = async(req,res)=>{

try{

const {name,email,password,events} = req.body

const coordinator = new User({
name,
email,
password,
role:"coordinator",
assignedEvents:events || []
})

await coordinator.save()

res.json(coordinator)

}catch(err){

console.log(err)
res.status(500).json({message:"Error adding coordinator"})

}

}


/* Get Coordinators */

exports.getCoordinators = async(req,res)=>{

try{

const coordinators = await User
.find({role:"coordinator"})
.populate("assignedEvents")

res.json(coordinators)

}catch(err){

console.log(err)
res.status(500).json({message:"Error fetching coordinators"})

}

}


/* Delete Coordinator */

exports.deleteCoordinator = async(req,res)=>{

try{

await User.findByIdAndDelete(req.params.id)

res.json({message:"Coordinator deleted"})

}catch(err){

console.log(err)
res.status(500).json({message:"Error deleting coordinator"})

}

}