const Event = require("../models/Event")
const User = require("../models/User")


/* Create Event */

exports.createEvent = async (req, res) => {

  try {

    const { name, description, criteria, roundBased, rounds } = req.body

    if (!name) {
      return res.status(400).json({ message: "Event name required" })
    }

    const formattedCriteria = (criteria || []).map(c => ({
      name: c.name,
      maxMarks: Number(c.maxMarks)
    }))

    const event = new Event({
      name,
      description,
      criteria: formattedCriteria,

      // NEW FIELDS FOR ROUND SYSTEM
      roundBased: roundBased || false,
      rounds: roundBased ? Number(rounds) : 1
    })

    await event.save()

    res.json({
      message: "Event created successfully",
      event
    })

  } catch (error) {

    console.log("Create Event Error:", error)

    res.status(500).json({
      message: "Server error while creating event"
    })

  }

}



/* Get All Events */

exports.getEvents = async (req,res)=>{

  try{

    const events = await Event.find()

    res.json(events)

  }catch(err){

    res.status(500).json(err)

  }

}



/* Get Single Event */

exports.getEvent = async(req,res)=>{

  try{

    const event = await Event.findById(req.params.eventId)

    res.json(event)

  }catch(err){

    res.status(500).json(err)

  }

}



/* Get Judge Events */

exports.getJudgeEvents = async(req,res)=>{

  try{

    const judge = await User.findById(req.params.judgeId)
    .populate("assignedEvents")

    res.json(judge.assignedEvents)

  }catch(err){

    res.status(500).json(err)

  }

}

/* UPDATE EVENT */

exports.updateEvent = async (req,res)=>{

try{

const {id} = req.params

const {name,description,criteria,roundBased,rounds} = req.body

const formattedCriteria = (criteria || []).map(c=>({
name:c.name,
maxMarks:Number(c.maxMarks)
}))

const event = await Event.findByIdAndUpdate(
id,
{
name,
description,
criteria:formattedCriteria,
roundBased,
rounds
},
{new:true}
)

res.json(event)

}catch(err){

console.log(err)

res.status(500).json({
message:"Error updating event"
})

}

}

/* Delete Event */

exports.deleteEvent = async (req,res)=>{

try{

const { id } = req.params

await Event.findByIdAndDelete(id)

res.json({message:"Event deleted successfully"})

}catch(err){

console.log("Delete Event Error:",err)

res.status(500).json({message:"Error deleting event"})

}

}