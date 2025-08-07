from flask import Blueprint, request, jsonify
from utils.pdf_reader import extract_text_from_pdf
from utils.extract_skills import extract_skills_with_glove
from routes.job_recommendation import get_jobs_for_skills
from routes.course_recommendation import get_courses_for_skills
from routes.resume_feedback import get_resume_feedback

upload_resume_bp = Blueprint('upload_resume', __name__)

@upload_resume_bp.route('/upload', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.endswith('.pdf'):
        # Extract text from PDF
        text = extract_text_from_pdf(file)

        # Extract skills from resume
        extracted_skills = extract_skills_with_glove(text)

        # Get jobs (with descriptions)
        jobs_raw = get_jobs_for_skills(extracted_skills)

        # Process each job dynamically
        top_jobs = []
        for job in jobs_raw:
            job_description = job.get('description', '')
            expected_skills = extract_skills_with_glove(job_description)
            missing_skills = list(set(expected_skills) - set(extracted_skills))
            courses = get_courses_for_skills(missing_skills)

            top_jobs.append({
                "title": job.get('title'),
                "url": job.get('url'),
                "expected_skills": expected_skills,
                "missing_skills": missing_skills,
                "recommended_courses": courses,
                "match": f"{100 - len(missing_skills)*5}%" if missing_skills else "100%"
            })

        # Resume feedback (Gemini)
        feedback = get_resume_feedback(text)

        # Final Response
        return jsonify({
            "extracted_skills": extracted_skills,
            "top_jobs": top_jobs,
            "resume_feedback": feedback
        }), 200

    return jsonify({'error': 'Invalid file format, PDF only'}), 400
