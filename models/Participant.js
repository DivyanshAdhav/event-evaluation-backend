const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },

  projectTitle: {
    type: String,
    required: true,
  },

  instituteName: {
    type: String,
    required: true,
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },

  status: {
    type: String,
    default: "active",
  },
});

module.exports = mongoose.model("Participant", ParticipantSchema);
