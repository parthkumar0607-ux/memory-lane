# Memory Lane API

```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
Check: http://localhost:8000/api/health  ·  Docs: http://localhost:8000/docs

## Database
Create a PostgreSQL database and put its URL in `.env`:
```
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@localhost:5432/memory_lane
```
Tables are created automatically on startup. Set a long random `JWT_SECRET`
(e.g. `python -c "import secrets; print(secrets.token_urlsafe(48))"`).

## Tests
`pytest` (uses a throwaway SQLite file, so no PostgreSQL needed).

## Endpoints (Phase 2)
`POST /api/auth/register` · `POST /api/auth/login` · `GET/PATCH /api/users/me` · `POST /api/users/me/password`
