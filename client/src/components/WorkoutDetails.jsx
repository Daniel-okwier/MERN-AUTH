import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const workoutId = workout._id;
    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${workoutId}`, { 
        method: 'DELETE' 
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to delete workout: ${errorResponse.message}`);
      }
  
      // Dispatch the workout ID directly
      dispatch({ type: 'DELETE_WORKOUT', payload: workoutId }); 
  
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails