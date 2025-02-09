const mongoose=require('mongoose');

const professorSchema=new mongoose.Schema({
    professorId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
 
module.exports=mongoose.model('Professors', professorSchema);