import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

# You can name your DB whatever you want:
db = client["skillaura"]
users_collection = db["users"]
