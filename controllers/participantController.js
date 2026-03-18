const Participant = require("../models/Participant");
const Event = require("../models/Event");
const XLSX = require("xlsx");

/* =========================
   Upload Excel Participants
========================= */
exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const errors = [];

    for (const row of data) {
      const event = await Event.findOne({ name: row.Event });

      if (!event) {
        errors.push(`Event not found: "${row.Event}"`);
        continue;
      }

      await Participant.create({
        groupId: String(row["Group ID"] || row["groupId"] || ""),
        projectTitle: String(row["Project Title"] || row["projectTitle"] || ""),
        instituteName: String(row["Institute Name"] || row["instituteName"] || ""),
        event: event._id,
        status: "active",
      });
    }

    if (errors.length > 0) {
      return res.json({
        message: "Participants uploaded with some skipped rows",
        skipped: errors,
      });
    }

    res.json({ message: "Participants uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error uploading participants",
      error: err.message,
    });
  }
};

/* =========================
   Get All Participants
========================= */
exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate("event");
    res.json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching participants",
      error: err.message,
    });
  }
};

/* =========================
   Get Participants By Event
========================= */
exports.getParticipantsByEvent = async (req, res) => {
  try {
    const participants = await Participant.find({
      event: req.params.eventId,
      status: "active",
    });

    res.json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching event participants",
      error: err.message,
    });
  }
};

/* =========================
   Get Single Participant
========================= */
exports.getParticipant = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);

    if (!participant) {
      return res.status(404).json({
        message: "Participant not found",
      });
    }

    res.json(participant);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching participant",
      error: err.message,
    });
  }
};

/* =========================
   Reject Participant
========================= */
exports.rejectParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    ).populate("event");

    if (!participant) {
      return res.status(404).json({
        message: "Participant not found",
      });
    }

    res.json({
      message: "Participant rejected successfully",
      participant,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error rejecting participant",
      error: err.message,
    });
  }
};

/* =========================
   Accept Participant
========================= */
exports.acceptParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndUpdate(
      req.params.id,
      { status: "active" },
      { new: true }
    ).populate("event");

    if (!participant) {
      return res.status(404).json({
        message: "Participant not found",
      });
    }

    res.json({
      message: "Participant accepted successfully",
      participant,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error accepting participant",
      error: err.message,
    });
  }
};
