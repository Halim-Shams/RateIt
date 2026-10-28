# RateIt Backend

FastAPI backend starter for the RateIt campus facility review app.

## 1. Requirements
Python 3.11+ recommended. PostgreSQL is recommended; the starter also falls back to SQLite for a quick first run.

## 2. Install
From this `backend` folder, run in Windows PowerShell:
```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## 3. Database configuration
Create a PostgreSQL database named `rateit`, then copy `.env.example` to `.env` and update the password in `DATABASE_URL`.
```text
DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/rateit
FRONTEND_ORIGINS=http://localhost:5173
```
If you do not configure `.env`, it uses a local SQLite file (`rateit_dev.db`) so you can test the API immediately.

## 4. Start API
```bash
uvicorn app.main:app --reload
```
Open `http://127.0.0.1:8000/docs` for interactive API docs, or `http://127.0.0.1:8000/api/health` for a health check.

In a second terminal, with the same virtual environment active:
```bash
python -m app.seed
```
This adds sample campus facilities to the configured database.

## Endpoints
- `GET /api/health`
- `GET /api/facilities`
- `GET /api/facilities?search=library`
- `GET /api/facilities?category=Food`
- `GET /api/facilities?sort=rating`
- `GET /api/facilities/{id}`
- `GET /api/facilities/{id}/reviews`
- `POST /api/facilities/{id}/reviews`
- `POST /api/reviews/{id}/reports`
- `POST /api/facilities` (development/demo only; secure before public deployment)

Example review JSON:
```json
{"rating":5,"title":"Good study environment","comment":"Quiet and useful place to study.","display_name":"Anonymous"}
```

## MVP caveats
Reviews are anonymous by default but not verified as being from NJUPT students. Reported reviews are recorded for moderation; no admin dashboard exists yet. Before public deployment, add student verification/authentication, rate limiting/spam protection, admin-only facility creation, and database migrations. The React integration should map the existing UI's data fields to these API response fields without redesigning the UI.
