const Evaluation = require("../models/Evaluation")
const Participant = require("../models/Participant")
const Event = require("../models/Event")
const User = require("../models/User")

/* =========================
   HELPER — average only over
   judges who actually evaluated
   (null slots are excluded)
========================= */
function calcAverage(judgeScoresArray) {
  const valid = judgeScoresArray.filter(s => s !== null && s !== undefined)
  if (valid.length === 0) return 0
  return valid.reduce((a, b) => a + b, 0) / valid.length
}


/* =========================
   EVENT REPORT
========================= */

exports.getEventReport = async (req, res) => {

  try {

    const { eventId } = req.params

    const judges = await User.find({ role: "judge", assignedEvents: eventId })
    const judgeIds   = judges.map(j => j._id.toString())
    const judgeNames = judges.map(j => j.name)

    const evaluations = await Evaluation.find({ event: eventId })
      .populate("participant")
      .populate("judge")

    const map = {}

    evaluations.forEach(e => {

      const pid = e.participant._id.toString()

      if (!map[pid]) {
        map[pid] = {
          groupId:       e.participant.groupId,
          projectTitle:  e.participant.projectTitle,
          instituteName: e.participant.instituteName,
          judges:        new Array(judgeIds.length).fill(null)
        }
      }

      const total = e.scores.reduce((sum, s) => sum + s.marks, 0)
      const index = judgeIds.indexOf(e.judge._id.toString())

      if (index !== -1) {
        map[pid].judges[index] = total
      }

    })

    let sr = 1

    const data = Object.values(map).map(p => {

      /* Average = sum of scores ÷ number of judges who actually evaluated */
      const avg = calcAverage(p.judges)

      return {
        sr:            sr++,
        groupId:       p.groupId,
        projectTitle:  p.projectTitle,
        instituteName: p.instituteName,
        judges:        p.judges,
        average:       avg.toFixed(2)
      }

    })

    res.json({ judges: judgeNames, data })

  } catch (err) {
    console.log("EVENT REPORT ERROR:", err)
    res.status(500).json({ message: "Report generation failed" })
  }

}


/* =========================
   INDIVIDUAL JUDGE REPORT
========================= */

exports.getJudgeReport = async (req, res) => {

  try {

    const { eventId, judgeId } = req.params

    const event = await Event.findById(eventId)

    const evaluations = await Evaluation.find({
      event: eventId,
      judge: judgeId
    }).populate("participant")

    let sr = 1

    const report = evaluations.map(e => {

      let total = 0

      if (event.roundBased) {

        const roundTotals = {}
        e.scores.forEach(s => {
          const round = s.round || "Main"
          if (!roundTotals[round]) roundTotals[round] = 0
          roundTotals[round] += s.marks
        })

        const rounds = Object.values(roundTotals)
        total = rounds.reduce((a, b) => a + b, 0) / rounds.length

      } else {

        total = e.scores.reduce((sum, s) => sum + s.marks, 0)

      }

      return {
        sr:            sr++,
        groupId:       e.participant.groupId,
        projectTitle:  e.participant.projectTitle,
        instituteName: e.participant.instituteName,
        marks:         total.toFixed(2)
      }

    })

    res.json(report)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }

}


/* =========================
   LEADERBOARD
   Average = sum of scores of judges
   who evaluated ÷ count of those
   judges only (not all assigned)
========================= */

exports.getLeaderboard = async (req, res) => {

  try {

    const { eventId } = req.params

    const judges = await User.find({ role: "judge", assignedEvents: eventId })
    const judgeIds   = judges.map(j => j._id.toString())
    const judgeNames = judges.map(j => j.name)

    const evaluations = await Evaluation.find({ event: eventId })
      .populate("participant")
      .populate("judge")

    const map = {}

    evaluations.forEach(e => {

      const pid = e.participant._id.toString()

      const total = e.scores.reduce((sum, s) => sum + s.marks, 0)

      if (!map[pid]) {
        map[pid] = {
          groupId:       e.participant.groupId,
          projectTitle:  e.participant.projectTitle,
          instituteName: e.participant.instituteName,
          judgeScores:   new Array(judgeIds.length).fill(null)
        }
      }

      const index = judgeIds.indexOf(e.judge._id.toString())
      if (index !== -1) {
        map[pid].judgeScores[index] = total
      }

    })

    let leaderboard = Object.values(map).map(p => {

      /* Average = sum of scores ÷ number of judges who actually evaluated */
      const avg = calcAverage(p.judgeScores)

      return {
        groupId:       p.groupId,
        projectTitle:  p.projectTitle,
        instituteName: p.instituteName,
        judgeScores:   p.judgeScores,
        average:       avg
      }

    })

    leaderboard.sort((a, b) => b.average - a.average)

    leaderboard = leaderboard.map((p, i) => ({
      rank:          i + 1,
      groupId:       p.groupId,
      projectTitle:  p.projectTitle,
      instituteName: p.instituteName,
      judgeScores:   p.judgeScores,
      average:       p.average.toFixed(2)
    }))

    res.json({ judges: judgeNames, data: leaderboard })

  } catch (err) {
    console.log("LEADERBOARD ERROR:", err)
    res.status(500).json({ message: "Leaderboard error" })
  }

}