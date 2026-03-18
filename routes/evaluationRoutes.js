const express = require("express")
const router = express.Router()

const evaluationController = require("../controllers/evaluationController")
const {verifyToken} = require("../middleware/authMiddleware")

router.get("/:eventId/:participantId/:judgeId", verifyToken, evaluationController.getEvaluation)

router.post("/submit", verifyToken, evaluationController.submitEvaluation)

router.get("/leaderboard/:eventId", verifyToken, evaluationController.getLeaderboard)

module.exports = router