from fastapi import FastAPI, UploadFile, File
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil
import uuid
import numpy as np
import cv2
from face_recognition.face_verifier import verify_face
from liveliness_detection.liveliness import detect_blink, detect_head_movement

app = FastAPI()

origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/verify-face")
async def verify_face_api(file: UploadFile = File(...)):
    os.makedirs("temp_uploads", exist_ok=True)  # Create temp folder if not exists
    temp_filename = f"temp_{uuid.uuid4()}.jpg"
    temp_filepath = os.path.join("temp_uploads", temp_filename)

    with open(temp_filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        username = verify_face(temp_filepath)
        if username:
            return {"verified": True, "username": username}
        else:
            return {"verified": False, "username": None}
    finally:
        if os.path.exists(temp_filepath):
            os.remove(temp_filepath)

@app.post("/liveness-check")
async def liveness_check(file: UploadFile = File(...)):
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    blink = detect_blink(frame)
    head = detect_head_movement(frame)

    return JSONResponse({
        "blinkDetected": blink,
        "headMovementDetected": head
    })

@app.get("/")
async def root():
    return RedirectResponse(url="/docs")

