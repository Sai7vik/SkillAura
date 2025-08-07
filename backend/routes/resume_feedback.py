import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

def get_resume_feedback(resume_text):
    prompt = f"""
    Analyze this resume text and suggest improvements in terms of:
    - ATS-friendly formatting
    - Missing technical keywords for software roles
    - Grammar and clarity
    - Strengthening impact of achievements

    Resume text:
    {resume_text}

    Provide feedback in short bullet points.
    """

    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)

    return response.text
