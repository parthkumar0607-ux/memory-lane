# Memory Lane API

```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
Check: http://localhost:8000/api/health  ·  Docs: http://localhost:8000/docs

## Database (one command)
With PostgreSQL running, from `backend/`:
```bash
python scripts/setup_db.py "postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/memory_lane"
```
This creates `.env` (with a generated `JWT_SECRET`), creates the `memory_lane` database if it
doesn't exist, and creates the tables. Safe to run again. After the first run you can omit the URL.

## Tests
`pytest` (uses a throwaway SQLite file, so no PostgreSQL needed).

## Endpoints (Phase 2)
`POST /api/auth/register` · `POST /api/auth/login` · `GET/PATCH /api/users/me` · `POST /api/users/me/password`
