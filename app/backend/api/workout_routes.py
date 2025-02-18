from fastapi import APIRouter, HTTPException
from app.backend.services.workout_services import (
    create_workout, get_workouts, delete_workout,
    create_exercise, get_exercises, delete_exercise
)

router = APIRouter()

@router.post("/workouts")
def create_workout_api(title: str):
    """
    Create a new workout
    """
    return create_workout(title)

@router.get("/workouts")
def get_workouts_api():
    """
    Get all workouts
    """
    return get_workouts()

@router.delete("/workouts/{workout_id}")
def delete_workout_api(workout_id: int):
    """
    Delete a workout
    """
    if delete_workout(workout_id):
        return {"message": "Workout deleted"}
    else:
        raise HTTPException(status_code=404, detail="Workout not found")
    

@router.post("/workouts/{workout_id}/exercises")
def create_exercise_api(workout_id: int, name: str, sets: int, reps: int):
    """
    Create a new exercise inside a specific workout
    """
    exercise = create_exercise(workout_id, name, sets, reps)
    if exercise:
        return exercise
    else:
        raise HTTPException(status_code=404, detail="Workout not found")

@router.get("/workouts/{workout_id}/exercises")
def get_exercises_api(workout_id: int):
    """
    Get all exercises for a specific workout
    """
    exercises = get_exercises(workout_id)
    if exercises:
        return exercises
    else:
        raise HTTPException(status_code=404, detail="Workout not found")
    
@router.delete("/workouts/{workout_id}/exercises/{exercise_id}")
def delete_exercise_api(workout_id: int, exercise_id: int):
    """
    Delete an exercise from a specific workout
    """
    if delete_exercise(workout_id, exercise_id):
        return {"message": "Exercise deleted"}
    else:
        raise HTTPException(status_code=404, detail="Workout or exercise not found")