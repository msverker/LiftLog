from fastapi import FastAPI
from app.backend.api.workout_routes import router as workout_router

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "LiftLog API is running!"}

app.include_router(workout_router)