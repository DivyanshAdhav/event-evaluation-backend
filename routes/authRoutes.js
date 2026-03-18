// const express = require("express")
// const router = express.Router()

// const User = require("../models/User")

// /* Login */

// router.post("/login", async(req,res)=>{

// try{

// const {email,password} = req.body

// const user = await User.findOne({email})

// if(!user){

// return res.status(400).json({
// message:"User not found"
// })

// }

// if(user.password !== password){

// return res.status(400).json({
// message:"Invalid password"
// })

// }

// res.json({

// id:user._id,
// name:user.name,
// email:user.email,
// role:user.role,
// assignedEvents:user.assignedEvents

// })

// }

// catch(err){

// res.status(500).json(err)

// }

// })

// module.exports = router

const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const User = require("../models/User")

/* Login */

router.post("/login", async(req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){

return res.status(400).json({
message:"User not found"
})

}

if(user.password !== password){

return res.status(400).json({
message:"Invalid password"
})

}

/* CREATE TOKEN */

const token = jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_SECRET || "techmantra_secret",

{expiresIn:"1d"}

)

/* RETURN OLD STRUCTURE + TOKEN */

res.json({

id:user._id,
name:user.name,
email:user.email,
role:user.role,
assignedEvents:user.assignedEvents,
token:token

})

}

catch(err){

console.log(err)

res.status(500).json({
message:"Login error"
})

}

})

module.exports = router