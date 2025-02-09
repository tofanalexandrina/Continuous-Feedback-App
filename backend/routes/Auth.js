
const express=require('express');
const router=express.Router();
const ProfessorModel=require('../models/Professor');
const bcrypt=require('bcrypt');

const { v4: uuidv4 } = require("uuid");


router.post('/signup', async(req, res)=>{
    try{
        const {name, email, password}=req.body;
        const hashedPassword=await bcrypt.hash(password, 10);
        const professorId = uuidv4();
        const newUser=new ProfessorModel({professorId, name, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message:'User registered successfully!'});
    }catch(err){
        res.status(500).json({error: 'Error registering user', details: err.message});
    }
});

router.post('/login', async(req, res)=>{
    const {email, password}=req.body;
    
    try{
        const user= await ProfessorModel.findOne({email: email});

        if(user){
            const isMatch=await bcrypt.compare(password, user.password);
            if(isMatch){
                res.json({message: "Success", name: user.name, professorId: user.professorId});
            } else{
                res.status(400).json("The password is incorrect")
            }
        } else{
            res.status(404).json("User does not exist")
        }
    }catch(err){
        res.status(500).json({error: 'Error logging in', details: err.message});
    }

});

module.exports=router;
