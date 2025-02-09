const express=require('express');
const router=express.Router();
const ActivityFeedbackModel=require('../models/ActivityFeedback');

const { v4: uuidv4 } = require("uuid");

router.post("/create" , async(req, res)=>{
    try{
        const { activityId, timestamp, emotionId } = req.body;
        const id_activityFeedback=uuidv4();
        const newActivityFeedback = new ActivityFeedbackModel({
            id_activityFeedback,
            activityId,
            timestamp, 
            emotionId 
        });
        await newActivityFeedback.save();
        res.status(201).json({message: "Activity feedback created successfully!"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//route to get feedback for a specific activity
router.get("/get", async(req, res)=>{
    const activityId=req.query.activityId;
    if (!activityId) {
        return res.status(400).json({ error: "activityId is required" });
    }
    try{
        const activitiesFeedback=await ActivityFeedbackModel.find({activityId});
        res.json(activitiesFeedback);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});



module.exports=router;