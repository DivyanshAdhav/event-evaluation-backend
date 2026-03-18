// const Evaluation = require("../models/Evaluation")

// /* -------------------------------- */
// /* GET EVALUATION */
// /* -------------------------------- */

// exports.getEvaluation = async (req,res)=>{

// try{

// const {eventId,participantId,judgeId} = req.params

// const evaluation = await Evaluation.findOne({
// event:eventId,
// participant:participantId,
// judge:judgeId
// })

// res.json(evaluation || null)

// }catch(err){

// console.log(err)
// res.status(500).json({message:"Server error"})

// }

// }


// /* -------------------------------- */
// /* SUBMIT / UPDATE EVALUATION */
// /* -------------------------------- */

// exports.submitEvaluation = async (req,res)=>{

// try{

// const {event,participant,judge,scores} = req.body

// let evaluation = await Evaluation.findOne({
// event,
// participant,
// judge
// })

// if(!evaluation){

// evaluation = new Evaluation({
// event,
// participant,
// judge,
// scores
// })

// }else{

// scores.forEach(newScore=>{

// const index = evaluation.scores.findIndex(
// s =>
// s.criteria === newScore.criteria &&
// (s.round || null) === (newScore.round || null)
// )

// if(index>-1){

// evaluation.scores[index].marks = newScore.marks

// }else{

// evaluation.scores.push(newScore)

// }

// })

// }

// await evaluation.save()

// res.json({
// message:"Evaluation saved",
// evaluation
// })

// }catch(err){

// console.log(err)

// res.status(500).json({
// message:"Error saving evaluation"
// })

// }

// }


// /* -------------------------------- */
// /* LEADERBOARD */
// /* -------------------------------- */

// exports.getLeaderboard = async (req,res)=>{

// try{

// const {eventId} = req.params

// const Event = require("../models/Event")
// const Evaluation = require("../models/Evaluation")

// const event = await Event.findById(eventId)

// const evaluations = await Evaluation
// .find({event:eventId})
// .populate("participant")

// const map = {}

// evaluations.forEach(e=>{

// const pid = e.participant._id.toString()

// /* -------- Judge Score Calculation -------- */

// let judgeScore = 0

// if(event.roundBased){

// const roundTotals = {}

// e.scores.forEach(s=>{

// const round = s.round || "Main"

// if(!roundTotals[round]){
// roundTotals[round] = 0
// }

// roundTotals[round] += s.marks

// })

// const rounds = Object.values(roundTotals)

// judgeScore = rounds.reduce((a,b)=>a+b,0) / rounds.length

// }else{

// judgeScore = e.scores.reduce((sum,s)=>sum+s.marks,0)

// }

// /* -------- Store per judge score -------- */

// if(!map[pid]){

// map[pid] = {
// name:e.participant.participants,
// judgeScores:[]
// }

// }

// map[pid].judgeScores.push(judgeScore)

// })

// /* -------- Final Leaderboard Score -------- */

// let leaderboard = Object.values(map).map(p=>{

// const sum = p.judgeScores.reduce((a,b)=>a+b,0)

// const avg = sum / p.judgeScores.length

// return{
// name:p.name,
// score:avg.toFixed(2)
// }

// })

// leaderboard.sort((a,b)=>b.score-a.score)

// res.json(leaderboard)

// }catch(err){

// console.log(err)
// res.status(500).json(err)

// }

// }

const Evaluation = require("../models/Evaluation")

/* -------------------------------- */
/* GET EVALUATION */
/* -------------------------------- */

exports.getEvaluation = async (req,res)=>{

try{

const {eventId,participantId,judgeId} = req.params

const evaluation = await Evaluation.findOne({
event:eventId,
participant:participantId,
judge:judgeId
})

res.json(evaluation || null)

}catch(err){

console.log(err)
res.status(500).json({message:"Server error"})

}

}


/* -------------------------------- */
/* SUBMIT / UPDATE EVALUATION */
/* -------------------------------- */

exports.submitEvaluation = async (req,res)=>{

try{

const {event,participant,judge,scores} = req.body

let evaluation = await Evaluation.findOne({
event,
participant,
judge
})

if(!evaluation){

evaluation = new Evaluation({
event,
participant,
judge,
scores
})

}else{

scores.forEach(newScore=>{

const index = evaluation.scores.findIndex(
s =>
s.criteria === newScore.criteria &&
(s.round || null) === (newScore.round || null)
)

if(index>-1){

evaluation.scores[index].marks = newScore.marks

}else{

evaluation.scores.push(newScore)

}

})

}

await evaluation.save()

res.json({
message:"Evaluation saved",
evaluation
})

}catch(err){

console.log(err)

res.status(500).json({
message:"Error saving evaluation"
})

}

}


/* -------------------------------- */
/* LEADERBOARD */
/* -------------------------------- */

exports.getLeaderboard = async (req,res)=>{

try{

const {eventId} = req.params

const Event = require("../models/Event")

const event = await Event.findById(eventId)

const evaluations = await Evaluation
.find({event:eventId})
.populate("participant")

const map = {}

evaluations.forEach(e=>{

const pid = e.participant._id.toString()

let judgeScore = 0

/* ROUND BASED EVENT */

if(event.roundBased){

const roundTotals = {}

e.scores.forEach(s=>{

const round = s.round || "Main"

if(!roundTotals[round]){
roundTotals[round] = 0
}

roundTotals[round] += s.marks

})

const rounds = Object.values(roundTotals)

judgeScore = rounds.reduce((a,b)=>a+b,0) / rounds.length

}

/* NORMAL EVENT */

else{

judgeScore = e.scores.reduce((sum,s)=>sum+s.marks,0)

}


/* STORE JUDGE SCORE */

if(!map[pid]){

map[pid] = {
groupId:e.participant.groupId,
projectTitle:e.participant.projectTitle,
instituteName:e.participant.instituteName,
judgeScores:[]
}

}

map[pid].judgeScores.push(judgeScore)

})


/* FINAL AVERAGE BASED ONLY ON ACTUAL EVALUATIONS */

/* FINAL AVERAGE — divide by number of judges who actually evaluated */

let leaderboard = Object.values(map).map(p=>{

const validScores = p.judgeScores.filter(s => s !== null && s !== undefined)

const sum = validScores.reduce((a,b)=>a+b,0)

const avg = validScores.length > 0 ? sum / validScores.length : 0

return{
groupId:p.groupId,
projectTitle:p.projectTitle,
instituteName:p.instituteName,
score:avg.toFixed(2)
}

})

leaderboard.sort((a,b)=>b.score-a.score)

res.json(leaderboard)

}catch(err){

console.log(err)
res.status(500).json(err)

}

}