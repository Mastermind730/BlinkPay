from fastapi import FastAPI, UploadFile, File, HTTPException,Form
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import shutil
import uuid
import numpy as np
import cv2
import cloudinary
import cloudinary.uploader
from pymongo import MongoClient
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
import face_recognition
import hashlib
from dotenv import load_dotenv
from deepface import DeepFace
load_dotenv()


# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure = True

)


# print("Cloudinary Config:", os.getenv('CLOUDINARY_API_KEY'))
# MongoDB setup

MONGO_URL=os.getenv("MONGODB_URL","")
client=AsyncIOMotorClient(MONGO_URL)
db=client.blinkers
users_collection = db.get_collection("users")  # Replace with your collection name

try:
    # Fetch all documents in the 'users' collection
    all_users =  users_collection.find().to_list(length=None)

    # Print each user
    print("Total users:", users_collection.count_documents({}))
    for user in all_users:
        print("\n--- User ---")
        print(user)  # Prints the entire BSON document

    # Alternative: Pretty-print using `pprint`
    from pprint import pprint
    for user in users_collection.find():
        pprint(user)

except Exception as e:
    print("Error:", e)


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    name: str
    email: EmailStr
    face_hash: str
    public_id: str
    wallet_address: Optional[str] = None
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

class EnrollmentRequest(BaseModel):
    name: str
    email: str
    wallet_address: str

def generate_face_hash(image_path: str) -> str:
    # Load the image file
    image = face_recognition.load_image_file(image_path)
    
    # Get face encodings
    face_encodings = face_recognition.face_encodings(image)
    
    if len(face_encodings) == 0:
        raise ValueError("No faces found in the image")
    
    # Convert the first face encoding to bytes
    face_encoding_bytes = face_encodings[0].tobytes()
    
    # Generate a hash from the face encoding
    return hashlib.sha256(face_encoding_bytes).hexdigest()


@app.post("/enroll-user")
async def enroll_user(
    file: UploadFile = File(...),
    name: str = Form(...),
    email: str = Form(...),
    wallet_address: str = Form(...)
):
    try:
        if not all([name, email, wallet_address]):
            raise HTTPException(status_code=422, detail="Missing required fields")

        # Save temp file
        temp_filename = f"temp_{uuid.uuid4()}.jpg"
        temp_filepath = os.path.join("temp_uploads", temp_filename)
        os.makedirs("temp_uploads", exist_ok=True)
        
        with open(temp_filepath, "wb") as buffer:
            buffer.write(await file.read())

        # Generate face hash
        face_hash = generate_face_hash(temp_filepath)
        existing_user = await users_collection.find_one({
    "$or": [
        {"email": email},
        {"wallet_address": wallet_address}
    ]
})
        if existing_user:
            print("Conflict found with:", existing_user)  # Debug line
            raise HTTPException(status_code=400, detail="User already exists")

        # Upload to Cloudinary
        cloudinary_response = cloudinary.uploader.upload(temp_filepath, folder="blinkpay/faces")

        # Insert user (async)
        result = await users_collection.insert_one({
            "name": name,
            "email": email,
            "face_hash": face_hash,
            "public_id": cloudinary_response['public_id'],
            "wallet_address": wallet_address,
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        })

        return JSONResponse({
            "success": True,
            "user_id": str(result.inserted_id),
            "public_id": cloudinary_response['public_id']
        })

    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_filepath):
            os.remove(temp_filepath)


@app.post("/verify-face")
async def verify_face_api(file: UploadFile = File(...)):
    temp_upload_dir = "temp_uploads"
    os.makedirs(temp_upload_dir, exist_ok=True)
    uploaded_temp_filepath = os.path.join(temp_upload_dir, f"uploaded_{uuid.uuid4()}.jpg")
    
    try:
        # Save the uploaded file temporarily
        with open(uploaded_temp_filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        all_users = await users_collection.find().to_list(length=None) # Fetch all users
        
        for user in all_users:
            public_id = user.get('public_id')
            if not public_id:
                continue 

            # Construct Cloudinary URL for the known user's face image
            known_face_url = cloudinary.utils.cloudinary_url(public_id, format="jpg")[0]
            
            try:
                # DeepFace.verify can compare a local path with a URL
                result = DeepFace.verify(
                    img1_path=uploaded_temp_filepath,
                    img2_path=known_face_url, 
                    enforce_detection=True, # Will raise error if no face is detected in either image
                    model_name="Facenet",
                    detector_backend="retinaface"
                )
                
                if result["verified"]:
                    return JSONResponse({
                        "verified": True,
                        "user_id": str(user['_id']),
                        "wallet_address": user['wallet_address'],
                        "name": user['name']
                    })
            except Exception as deepface_error:
                # This catches errors specific to DeepFace (e.g., no face found in an image)
                print(f"DeepFace verification error for user {user.get('email', 'N/A')}: {deepface_error}")
                continue # Try next user if this comparison fails
                
        return JSONResponse({"verified": False, "message": "No matching user found."})
        
    except Exception as e:
        print(f"General error in /verify-face: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error during verification: {e}")
    finally:
        if os.path.exists(uploaded_temp_filepath):
            os.remove(uploaded_temp_filepath)


@app.post("/liveness-check")
async def liveness_check(file: UploadFile = File(...)):
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    # These would be replaced with your actual liveness detection functions
    blink = True  # Placeholder for detect_blink(frame)
    head = True   # Placeholder for detect_head_movement(frame)
    
    return JSONResponse({
        "blinkDetected": blink,
        "headMovementDetected": head
    })

@app.get("/")
async def root():
    return RedirectResponse(url="/docs")