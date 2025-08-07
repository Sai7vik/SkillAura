from flask import Blueprint, request, jsonify
from utils.pdf_reader import extract_text_from_pdf
from utils.extract_skills import extract_skills_with_glove
from routes.job_recommendation import get_jobs_for_skills
from routes.course_recommendation import get_courses_for_skills
from routes.resume_feedback import get_resume_feedback

analyze_resume_bp = Blueprint('analyze_resume', __name__)

@analyze_resume_bp.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    if not file.filename.endswith('.pdf'):
        return jsonify({'error': 'Only PDF files allowed'}), 400

    try:
        # 1. Extract Text from Resume
        text = extract_text_from_pdf(file)

        # 2. Extract Skills
        extracted_skills = extract_skills_with_glove(text)

        # 3. Get Top 5 Job Listings
        jobs = get_jobs_for_skills(extracted_skills)

        # 4. Match Skills, Find Missing, Recommend Courses
        enriched_jobs = []
        for job in jobs:
            job_desc = job.get('description', '')
            expected_skills = extract_skills_with_glove(job_desc)
            missing = list(set(expected_skills) - set(extracted_skills))
            courses = get_courses_for_skills(missing)

            enriched_jobs.append({
                "title": job.get('title'),
                "url": job.get('url'),
                "expected_skills": expected_skills,
                "missing_skills": missing,
                "recommended_courses": courses,
                "match": f"{100 - len(missing) * 5}%" if missing else "100%"
            })

        # 5. Resume Feedback using Gemini
        feedback = get_resume_feedback(text)

        # ✅ Final JSON Response
        return jsonify({
            "extracted_skills": extracted_skills,
            "top_jobs": enriched_jobs,
            "resume_feedback": feedback
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
