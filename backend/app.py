from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from routes.upload_resume import upload_resume_bp
from routes.auth import auth_bp
from routes.analyze_resume import analyze_resume_bp  # ✅ New route

load_dotenv()

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(upload_resume_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(analyze_resume_bp)  # ✅ Register new analyze route

if __name__ == '__main__':
    app.run(debug=True)