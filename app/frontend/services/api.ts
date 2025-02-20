import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";

export const getWorkouts = async () => {
    try {
        const response = await axios.get(`${API_URL}/workouts`);
        return response.data;
    } catch (error) {
        console.error("Error fetching workouts", error);
        return [];
    }
};

export const createWorkout = async (title: string) => {
    try {
        const response = await axios.post(`${API_URL}/workouts`, { title });
        return response.data;
    } catch (error) {
        console.error("Error creating workout", error);
    }
};