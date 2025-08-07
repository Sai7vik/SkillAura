from utils.glove_embeddings import load_glove_model
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re

stop_words = set(stopwords.words('english'))

valid_skills = {
    'python', 'html', 'css', 'sql', 'firebase', 'react', 'javascript',
    'node.js', 'docker', 'aws', 'kubernetes', 'mongodb', 'express',
    'sqlite', 'cloud', 'git', 'linux', 'machine learning', 'data science',
    'tensorflow', 'pandas', 'numpy', 'java', 'spring', 'django', 'c++',
    'web', 'development', 'flask', 'fastapi'
}

def clean_and_split_text(text):
    text = re.sub(r'[^a-zA-Z0-9\s\.\-]', ' ', text.lower())
    return list(set([word.strip() for word in text.split() if word not in stop_words and len(word) > 2]))

def extract_skills_with_glove(text):
    glove_model = load_glove_model('./glove/glove.6B.50d.txt')
    words = clean_and_split_text(text)

    extracted = set()

    for word in words:
        if word in valid_skills:
            extracted.add(word)
        elif word in glove_model:
            word_vector = glove_model[word].reshape(1, -1)

            most_similar = None
            highest_score = 0

            for skill in valid_skills:
                if skill in glove_model:
                    skill_vector = glove_model[skill].reshape(1, -1)
                    similarity = cosine_similarity(word_vector, skill_vector)[0][0]
                    if similarity > highest_score:
                        highest_score = similarity
                        most_similar = skill

                    if similarity > 0.85:
                        extracted.add(skill)

            # Fallback if no matches in valid_skills but high similarity with something new
            if highest_score > 0.9 and most_similar is None:
                extracted.add(word)  # Add the word directly
                print(f"⚠️ Added unknown skill based on high similarity: {word} (score: {highest_score:.2f})")

    # Phrase match (e.g., machine learning)
    text_lower = text.lower()
    for phrase in valid_skills:
        if " " in phrase and phrase in text_lower:
            extracted.add(phrase)

    return list(extracted)
