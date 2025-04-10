from fastapi import APIRouter, HTTPException
from app.backend.services.workout_services import (
    create_exercise, get_exercises, delete_exercise,
)
from pydantic import BaseModel

router = APIRouter()

class Exercise(BaseModel):
    title: str
    sets: int
    reps: int

@router.post("/workouts/{workout_id}/exercises")
def create_exercise_api(workout_id: int, exercise: Exercise):
    """
    Create a new exercise for a workout
    """
    result = create_exercise(workout_id, exercise.title, exercise.sets, exercise.reps)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Workout not found")

@router.get("/workouts/{workout_id}/exercises")
def get_exercises_api(workout_id: int):
    """
    Get all exercises for a workout
    """
    exercises = get_exercises(workout_id)
    return exercises

@router.delete("/workouts/{workout_id}/exercises/{exercise_id}")
def delete_exercise_api(workout_id: int, exercise_id: int):
    """
    Delete an exercise from a workout
    """
    if delete_exercise(workout_id, exercise_id):
        return {"message": "Exercise deleted"}
    raise HTTPException(status_code=404, detail="Exercise or workout not found")