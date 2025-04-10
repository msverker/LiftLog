import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// Fetch all workouts
export const getWorkouts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workouts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
};

// Function to add a workout
export const addWorkout = async (title) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workouts`, null, {
      params: { title },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding workout:", error);
    return null;
  }
};

// Delete a workout
export const deleteWorkout = async (workoutId) => {
  try {
    await axios.delete(`${API_BASE_URL}/workouts/${workoutId}`);
    return true;
  } catch (error) {
    console.error("Error deleting workout:", error);
    return false;
  }
};

export const getExercises = async (workoutId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workouts/${workoutId}/exercises`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

export const addExercise = async (workoutId, title, sets, reps) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workouts/${workoutId}/exercises`, {
      title,
      sets: parseInt(sets),
      reps: parseInt(reps),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding exercise:", error);
    return null;
  }
};

export const deleteExercise = async (workoutId, exerciseId) => {
  try {
    await axios.delete(`${API_BASE_URL}/workouts/${workoutId}/exercises/${exerciseId}`);
    return true;
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return false;
  }
}