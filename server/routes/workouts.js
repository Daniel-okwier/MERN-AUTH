const express = require('express');
const router = express.Router();
const {createWorkout,
        getWorkouts,
        getWorkout,
        deleteWorkout,
        updateWorkout} = require('../controllers/workoutController');


//get all workouts
router.get('/',getWorkouts)


//get a workout
router.get('/:id',getWorkout)



//post a workout
router.post('/', createWorkout)

//delete a workout
router.delete('/:id',deleteWorkout)



//update a workout
router.patch('/:id',updateWorkout)

module.exports = router;