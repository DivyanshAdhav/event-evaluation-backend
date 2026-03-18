const express = require("express")
const router = express.Router()

const coordinatorController = require("../controllers/coordinatorController")
const {verifyToken} = require("../middleware/authMiddleware")

router.post("/add", verifyToken, coordinatorController.addCoordinator)

router.get("/", verifyToken, coordinatorController.getCoordinators)

router.delete("/delete/:id", verifyToken, coordinatorController.deleteCoordinator)

module.exports = router