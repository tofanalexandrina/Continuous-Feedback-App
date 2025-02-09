const mongoose=require('mongoose');


const activitySchema=new mongoose.Schema({
    activityId: {type: String, required: true, unique: true},
    professorId: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    code: {type: String, required: true}
});

module.exports=mongoose.model('Activities', activitySchema);