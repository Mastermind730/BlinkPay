from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["BlinkPay"]
users_collection = db["users"]

router = APIRouter()

class User(BaseModel):
    name:str
    email:EmailStr
    face_hash:str
    wallet_id:str 