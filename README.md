# SkillAura 🔥

**SkillAura** is a smart job-matching web app that:
- Analyzes your resume (PDF)
- Extracts your tech skills using NLP + GloVe
- Suggests top matching jobs via Jooble API
- Identifies missing skills & recommends courses
- Gives AI-powered resume feedback (Gemini)
- Includes secure JWT-based authentication
- Built with Flask + React + TailwindCSS

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Flask, JWT, Argon2, PyPDF2, GloVe, Google Generative AI
- **APIs Used:** Jooble, Gemini
- **Security:** JWT Auth, Argon2 Hashing

---

## 🚀 How to Run

```bash
# backend
cd backend
python3 -m venv tenv
source tenv/bin/activate
pip install -r requirements.txt
python app.py

# frontend
cd frontend
npm install
npm run dev
