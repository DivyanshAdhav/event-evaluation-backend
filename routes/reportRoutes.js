// const express = require("express")
// const router = express.Router()

// const reportController = require("../controllers/reportController")

// router.get("/event/:eventId",reportController.getEventReport)

// router.get("/judge/:eventId/:judgeId",reportController.getJudgeReport)

// module.exports = router

const express = require("express")
const router = express.Router()

const reportController = require("../controllers/reportController")
const {verifyToken} = require("../middleware/authMiddleware")

/* EVENT REPORT */

router.get("/event/:eventId", verifyToken, reportController.getEventReport)

/* INDIVIDUAL JUDGE REPORT */

router.get("/judge/:eventId/:judgeId", verifyToken, reportController.getJudgeReport)

/* LEADERBOARD */

router.get("/leaderboard/:eventId", verifyToken, reportController.getLeaderboard)

module.exports = router