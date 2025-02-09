const express=require('express');
const router=express.Router();
const ActivityModel=require('../models/Activity');

const { v4: uuidv4 } = require("uuid");

//route to create an activity
router.post("/", async(req, res)=>{
    try{
        const { professorId, name, description, startTime, endTime, code } = req.body;
        const activityId=uuidv4();
        const newActivity = new ActivityModel({
            activityId,
            professorId,
            name,
            description,
            startTime,
            endTime,
            code
        });

        await newActivity.save();
        res.status(201).json({message: "Activity created successfully!"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//route to get activities for a specific professor
router.get("/", async(req, res)=>{
    const professorId=req.query.professorId;
    if (!professorId) {
        return res.status(400).json({ error: "professorId is required" });
    }
    try{
        const activities=await ActivityModel.find({professorId});
        res.json(activities);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

//endpoint for searching activity based on id(for activity details page)
router.get('/:activityId', async(req, res)=>{
    const {activityId}=req.params;
    try{
        const activity=await ActivityModel.findOne({activityId:activityId});
        if(!activity){
            return res.status(404).json({message: 'Activity not found'});
        }
        //returns the found activity
        res.json(activity);
    }catch(err){
        console.error("Error fetching activity: ", err);
        res.status(500).json({message: "Server error"});
    }
});

//endpoint for searching activity with provided code(in GeneralMain)
router.get("/code/:code", async(req, res)=>{
    try{
        const activity=await ActivityModel.findOne({code: req.params.code});
        if(activity){
            //returns the found activity
            return res.json(activity);
        }else{
            return res.status(404).json({message: 'Activity not found'});
        }
    }catch(err){
        console.error("Error fetching activity: ", err);
        res.status(500).json({message: "Server error"});
    }
})
module.exports=router;