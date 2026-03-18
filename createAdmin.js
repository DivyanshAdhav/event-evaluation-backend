const mongoose = require("mongoose")
require("dotenv").config()

const User = require("./models/User")

mongoose.connect(process.env.MONGO_URI)

const createAdmin = async()=>{

const admin = new User({

name:"Admin",
email:"admin@college.com",
password:"admin123",
role:"admin"

})

await admin.save()

console.log("Admin created")

process.exit()

}

createAdmin()