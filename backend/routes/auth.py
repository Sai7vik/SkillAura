import json
import os
import jwt
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from argon2 import PasswordHasher
from dotenv import load_dotenv

load_dotenv()

auth_bp = Blueprint("auth", __name__)
USERS_FILE = "users.json"
SECRET_KEY = os.getenv("SECRET_KEY") or "default_secret"  # fallback if .env fails
ph = PasswordHasher()

# Load and save users
def load_users():
    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)

# Generate JWT token
def generate_token(username):
    payload = {
        "sub": username,
        "exp": datetime.utcnow() + timedelta(hours=3)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

# Signup route
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    users = load_users()
    if username in users:
        return jsonify({"error": "User already exists"}), 400

    users[username] = {
        "password": ph.hash(password)
    }
    save_users(users)

    token = generate_token(username)
    return jsonify({"message": "User registered successfully!", "token": token}), 201

# Login route
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    users = load_users()
    user = users.get(username)

    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        ph.verify(user["password"], password)
        token = generate_token(username)
        return jsonify({"message": "Login successful!", "token": token}), 200
    except:
        return jsonify({"error": "Invalid credentials"}), 401
