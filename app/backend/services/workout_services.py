from typing import List, Dict

workouts = []
workout_id_counter = 1
exercise_id_counter = 1

def create_workout(title: str) -> dict:
    """
    Create a new workout
    """
    global workout_id_counter
    workout = {"id": workout_id_counter, "title": title, "exercises": []}
    workouts.append(workout)
    workout_id_counter += 1
    return workout

def get_workouts() -> List[dict]:
    """
    Get all workouts
    """
    return workouts

def delete_workout(workout_id: int) -> bool:
    """
    Delete a workout
    """
    global workouts
    original_length = len(workouts)
    workouts = [w for w in workouts if w["id"] != workout_id]
    return len(workouts) < original_length

def get_exercises(workout_id: int) -> List[Dict]:
    """
    Get all exercises in a workout
    """
    workout = next((w for w in workouts if w["id"] == workout_id), None)
    return workout["exercises"] if workout else []

def create_exercise(workout_id: int, title: str, sets: int, reps: int) -> Dict:
    """
    Create a new exercise in a workout
    """
    global exercise_id_counter
    workout = next((w for w in workouts if w["id"] == workout_id), None)
    if not workout:
        return None
    exercise = {"id": exercise_id_counter, "title": title, "sets": sets, "reps": reps}
    workout["exercises"].append(exercise)
    exercise_id_counter += 1
    return exercise

def delete_exercise(workout_id: int, exercise_id: int) -> bool:
    """
    Delete an exercise from a workout
    """
    workout = next((w for w in workouts if w["id"] == workout_id), None)
    if not workout:
        return False
    original_length = len(workout["exercises"])
    workout["exercises"] = [e for e in workout["exercises"] if e["id"] != exercise_id]
    return len(workout["exercises"]) < original_length