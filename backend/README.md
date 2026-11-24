# Memory Lane API

```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
Check: http://localhost:8000/api/health  ·  Docs: http://localhost:8000/docs
