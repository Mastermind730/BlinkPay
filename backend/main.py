from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pydantic import BaseModel,EmailStr,Field
from dotenv import load_dotenv


load_dotenv()
app=FastAPI()

origins=[
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



MONGO_URL=os.getenv("MONGODB_URL","")
client=AsyncIOMotorClient(MONGO_URL)
db=client.blinkers


class User(BaseModel):
    name:str
    email:EmailStr
    face_hash:str
    wallet_id:str
    
    
@app.get("/")
async def main():
    return {"message":"Hello world"}
@app.post("/users/", response_model=User)
async def create_user(user: User):
    user_dict = user.model_dump()
    result = await db.users.insert_one(user_dict)
    return user