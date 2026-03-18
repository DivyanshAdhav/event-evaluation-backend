require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const eventRoutes = require("./routes/eventRoutes")
const judgeRoutes = require("./routes/judgeRoutes")
const participantRoutes = require("./routes/participantRoutes")
const evaluationRoutes = require("./routes/evaluationRoutes")
const reportRoutes = require("./routes/reportRoutes")
const coordinatorRoutes = require("./routes/coordinatorRoutes")
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
  origin: "https://event-evaluation-frontend-jc6j.vercel.app",
  credentials: true
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log("MongoDB Connected")
})
.catch(err=>{
console.log(err)
})

app.use("/api/auth",authRoutes)
app.use("/api/events",eventRoutes)
app.use("/api/judges",judgeRoutes)
app.use("/api/participants",participantRoutes)
app.use("/api/evaluation",evaluationRoutes)
app.use("/api/reports",reportRoutes)
app.use("/api/coordinators", coordinatorRoutes)
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})