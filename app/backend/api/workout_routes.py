from fastapi import APIRouter, HTTPException
from app.backend.services.workout_services import (
    create_workout, get_workouts, delete_workout,
)
from pydantic import BaseModel

router = APIRouter()

class Workout(BaseModel):
    title: str

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