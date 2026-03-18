const express = require("express")
const router = express.Router()

const eventController = require("../controllers/eventController")
const {verifyToken} = require("../middleware/authMiddleware")

router.post("/create", verifyToken, eventController.createEvent)

router.get("/all", verifyToken, eventController.getEvents)

router.get("/:eventId", verifyToken, eventController.getEvent)

router.put("/update/:id", verifyToken, eventController.updateEvent)

router.delete("/delete/:id", verifyToken, eventController.deleteEvent)  

router.get("/judge/:judgeId", verifyToken, eventController.getJudgeEvents)

module.exports = router