// const express = require("express")
// const router = express.Router()

// const judgeController = require("../controllers/judgeController")

// // Add Judge
// router.post("/add", judgeController.addJudge)

// // Get All Judges
// router.get("/all", judgeController.getJudges)

// // Delete Judge
// router.delete("/delete/:id", judgeController.deleteJudge)

// module.exports = router

// const express = require("express")
// const router = express.Router()

// const judgeController = require("../controllers/judgeController")

// router.get("/", judgeController.getJudges)

// router.get("/:id", judgeController.getJudge)

// router.post("/add", judgeController.addJudge)

// router.put("/update/:id", judgeController.updateJudge)

// router.delete("/delete/:id", judgeController.deleteJudge)

// module.exports = router


// const express = require("express")
// const router = express.Router()

// const User = require("../models/User")

// /* GET ALL JUDGES */

// router.get("/", async(req,res)=>{

// try{

// const judges = await User.find({role:"judge"})
// .populate("assignedEvents")

// res.json(judges)

// }catch(err){

// console.log(err)
// res.status(500).json({message:"Error fetching judges"})

// }

// })

// /* GET JUDGES BY EVENT */

// router.get("/event/:eventId", async(req,res)=>{

// try{

// const judges = await User.find({
// role:"judge",
// assignedEvents:req.params.eventId
// })

// res.json(judges)

// }catch(err){

// console.log(err)
// res.status(500).json({message:"Error fetching judges by event"})

// }

// })

// module.exports = router


const express = require("express")
const router = express.Router()

const judgeController = require("../controllers/judgeController")
const {verifyToken} = require("../middleware/authMiddleware")

/* GET ALL JUDGES */

router.get("/", verifyToken, judgeController.getJudges)

/* GET JUDGES OF EVENT (MUST BE BEFORE /:id) */

router.get("/event/:eventId", verifyToken, judgeController.getJudgesByEvent)

/* GET SINGLE JUDGE */

router.get("/:id", verifyToken, judgeController.getJudge)

/* ADD JUDGE */

router.post("/add", verifyToken, judgeController.addJudge)

/* UPDATE JUDGE */

router.put("/update/:id", verifyToken, judgeController.updateJudge)

/* DELETE JUDGE */

router.delete("/delete/:id", verifyToken, judgeController.deleteJudge)

module.exports = router