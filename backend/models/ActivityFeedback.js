const mongoose=require('mongoose');

const activityFeedbackSchema=new mongoose.Schema({
    id_activityFeedback: {type: String, required: true, unique: true},
    activityId: {type: String, required: true},
    timestamp: {type: Date, required: true},
    emotionId: {type: Number, required: true}
});
 
module.exports=mongoose.model('ActivityFeedback', activityFeedbackSchema);