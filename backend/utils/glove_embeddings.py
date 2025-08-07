import numpy as np

def load_glove_model(glove_file):
    model = {}
    with open(glove_file, 'r', encoding='utf8') as f:
        for line in f:
            split_line = line.split()
            word = split_line[0]
            embedding = np.array([float(val) for val in split_line[1:]])
            model[word] = embedding
    return model

def get_skills_from_text(text, glove_model):
    words = text.lower().split()
    skills_found = set()
    for word in words:
        if word in glove_model:
            skills_found.add(word)
    return list(skills_found)
