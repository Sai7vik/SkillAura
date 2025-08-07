import requests
import os
from dotenv import load_dotenv

load_dotenv()

JOOBLE_API_KEY = os.getenv('JOOBLE_API_KEY')

def get_jobs_for_skills(skills_list):
    query = " ".join(skills_list)

    url = f"https://jooble.org/api/{JOOBLE_API_KEY}"
    payload = {
        "keywords": query,
        "location": "India"
    }

    response = requests.post(url, json=payload)
    data = response.json()

    jobs = []
    for job in data.get('jobs', [])[:5]:
        jobs.append({
            'title': job.get('title'),
            'description': job.get('snippet'),  # For extracting expected skills later
            'url': job.get('link')
        })

    return jobs
