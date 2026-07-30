# CodeDoctor AI

AI-powered repository intelligence for code review, debugging, and security analysis.

**Live Demo:** `https://code-doctor-ai-orcin.vercel.app/`

**GitHub:** `https://github.com/Sreelakshmii-R/CodeDoctor-AI`

---

## Overview

CodeDoctor AI is a full-stack AI-powered SaaS platform that analyzes GitHub repositories and generates structured code review reports.

Users can connect a GitHub repository, automatically clone it, run an AI-powered analysis, view the latest report, monitor repository activity, and track dashboard insights from a centralized interface.

---

## Features

* GitHub repository integration
* Automatic repository cloning
* AI-powered code analysis
* Code quality review
* Bug and potential error detection
* Security vulnerability analysis
* Performance and best-practice insights
* AI-generated repository reports
* Repository analysis history
* Dashboard statistics
* Recent activity tracking
* AI insights
* Notification dropdown
* Repository deletion with analysis cleanup
* Responsive React interface
* Production deployment with Vercel, Render, and Neon PostgreSQL

---

## Screenshots

### Dashboard

<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/9080857e-a528-4d23-a89e-a4aea7b8adab" />


### Repositories

<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/86ecffa4-ad8c-4d1c-bc2b-cf2907a07161" />


### Repository Analysis

<img width="360" height="300" alt="image" src="https://github.com/user-attachments/assets/1e2d5021-6447-49fb-811c-6cc4b49046f9" />


---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript
* Lucide React

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Docker
* GitPython

### AI

* Groq API
* Llama-based model for repository analysis

### Database

* PostgreSQL
* Neon PostgreSQL in production

### Deployment

* Vercel — frontend
* Render — backend
* Neon — production database

---

## Architecture

```text
                     CodeDoctor AI
                           │
              ┌────────────┴────────────┐
              │                         │
        React + Vite              FastAPI Backend
        Vercel                    Render + Docker
              │                         │
              └────────────┬────────────┘
                           │
                    PostgreSQL
                       Neon
                           │
                       Groq AI
```

---

## How It Works

```text
1. User submits a GitHub repository URL
              ↓
2. FastAPI validates and stores repository metadata
              ↓
3. Repository is cloned locally by the backend
              ↓
4. Code files are read and prepared for analysis
              ↓
5. Groq AI analyzes the repository
              ↓
6. Analysis report is stored in PostgreSQL
              ↓
7. React dashboard displays scores, activity, and insights
```

---

## Dashboard

The dashboard provides a centralized overview of repository intelligence, including:

* Total repositories
* Total AI reviews
* Overall AI/code-quality score
* Issues found
* Recent repository activity
* AI-generated insights

Dashboard statistics are calculated from the latest analysis data stored in PostgreSQL.

---

## Repository Analysis

Each repository can be analyzed to generate a structured report covering areas such as:

* Project summary
* Code quality
* Bugs and potential errors
* Security vulnerabilities
* Performance considerations
* Best-practice suggestions
* Overall AI score

---

## Local Development

### Prerequisites

* Python 3.11+
* Node.js 18+
* Docker Desktop
* Git
* Groq API key

### Clone the repository

```bash
git clone https://github.com/Sreelakshmii-R/CodeDoctor-AI.git
cd CodeDoctor-AI
```

### Backend

```bash
cd backend
python -m venv venv
```

Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```env
DATABASE_URL=your_postgresql_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

---

## Docker Development

The backend includes Docker configuration for local PostgreSQL and application development.

```bash
docker compose up --build
```

---

## Environment Variables

### Backend

```env
DATABASE_URL=your_postgresql_connection_string
GROQ_API_KEY=your_groq_api_key
```

### Frontend

```env
VITE_API_URL=your_backend_api_url
```

Never commit `.env` files, API keys, database passwords, or database dumps to GitHub.

---

## Deployment

### Frontend

The React/Vite application is deployed on Vercel.

Production environment variable:

```env
VITE_API_URL=https://codedoctor-ai-xieg.onrender.com
```

### Backend

The FastAPI application is containerized with Docker and deployed on Render.

Production environment variables:

```env
DATABASE_URL=your_neon_connection_string
GROQ_API_KEY=your_groq_api_key
```

### Database

Production PostgreSQL is hosted on Neon.

---

## Project Structure

```text
CodeDoctor-AI/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── alembic/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── docker-compose.yml
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

---

## API Highlights

| Endpoint                             | Method | Purpose             |
| ------------------------------------ | ------ | ------------------- |
| `/repositories`                      | GET    | List repositories   |
| `/repositories`                      | POST   | Add a repository    |
| `/repositories/{id}`                 | DELETE | Delete a repository |
| `/repositories/{id}/analyze`         | POST   | Run AI analysis     |
| `/repositories/{id}/latest-analysis` | GET    | Get latest report   |
| `/dashboard/stats`                   | GET    | Dashboard metrics   |
| `/dashboard/activity`                | GET    | Recent activity     |
| `/dashboard/insights`                | GET    | AI insights         |

---

## Security Notes

* Secrets are provided through environment variables.
* Production PostgreSQL credentials are not stored in source code.
* `.env`, virtual environments, database dumps, and cloned repositories are excluded from Git.
* CORS is configured to allow the deployed frontend and local development environment.

---

## Future Improvements

* Analysis history comparison
* Export reports as PDF/Markdown
* GitHub pull-request integration
* Repository health trends
* Advanced security scanning
* Background analysis jobs
* Persistent repository/object storage
* Authentication and multi-user workspaces

---

## Author

**Sreelakshmi Ramesh**

Built as a full-stack AI SaaS project demonstrating React, FastAPI, PostgreSQL, Docker, cloud deployment, GitHub integration, and LLM-powered code analysis.
