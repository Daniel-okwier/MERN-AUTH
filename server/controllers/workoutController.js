const mongoose = require('mongoose'); 
const Workout = require('../models/workoutModel');

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single workout 
const getWorkout = async (req, res) => {
  const { id } = req.params;
  
  try {
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Invalid workout ID format' });
    }

    const workout = await Workout.findById(id);
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create workout )
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};

//delete workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID format' });
  }
  
  const workout = await Workout.findByIdAndDelete(id); 
  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.json({ 
    message: 'Workout deleted successfully',
    deletedWorkout: workout 
  });
};


// Update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID format' });
  }
  
  const workout = await Workout.findByIdAndUpdate(
    id, 
    req.body, 
    { new: true } // Returns the updated document
  );
  
  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.json({ 
    message: 'Workout updated successfully',
    updatedWorkout: workout 
  });
};





module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
}