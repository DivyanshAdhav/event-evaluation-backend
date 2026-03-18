const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const participantController = require("../controllers/participantController");
const {verifyToken} = require("../middleware/authMiddleware")

/* Upload Excel */
router.post(
  "/upload-excel",
  upload.single("file"),
  verifyToken, participantController.uploadExcel
);

router.get("/", verifyToken, participantController.getParticipants)

/* Get all participants */
router.get("/all", verifyToken, participantController.getParticipants);

/* Get participants by event */
router.get("/event/:eventId", verifyToken, participantController.getParticipantsByEvent);

/* Get one participant */
router.get("/:id", verifyToken, participantController.getParticipant);

/* Reject participant */
router.put("/reject/:id", verifyToken, participantController.rejectParticipant);

/* Accept participant */
router.put("/accept/:id", verifyToken, participantController.acceptParticipant);

module.exports = router;