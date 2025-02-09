const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
//we are using variables from .env file
require('dotenv').config();

const app=express();
//front to back in json format
//middlewares
app.use(express.json());
app.use(cors());

//routes
const authRoutes=require('./routes/Auth');
app.use('/api/auth', authRoutes);

const activityRoutes=require('./routes/ActivityRoutes');
app.use('/api/activities', activityRoutes);

const activityFeedbackRoutes=require('./routes/ActivityFeedbackRoutes');
app.use('/api/activities-feedback', activityFeedbackRoutes);


//connection to db
mongoose.connect(process.env.MONGO_URL).then(()=>console.log(`Connected to MongoDB...`)).catch((err)=>console.log('Database connection error: ', err));

//start the server
const PORT=process.env.port || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
