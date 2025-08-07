def get_courses_for_skills(missing_skills):
    recommended_courses = []

    for skill in missing_skills:
        course = f"https://www.udemy.com/courses/search/?q={skill}"
        recommended_courses.append({
            "skill": skill,
            "course_url": course
        })

    return recommended_courses
