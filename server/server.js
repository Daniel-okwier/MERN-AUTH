require('dotenv').config()
const express = require('express');
const app = express();
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,  req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log('connected to the db and listening on port' , process.env.PORT); 
        });
})
.catch((error)=>{
   console.log(error)
})

