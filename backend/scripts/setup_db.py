"""
One-command setup:  python scripts/setup_db.py

1. Creates backend/.env from .env.example if missing, with a freshly generated JWT_SECRET.
2. Creates the PostgreSQL database named in DATABASE_URL if it doesn't exist yet.
3. Creates the tables.

Optional: pass your Postgres URL once, e.g.
  python scripts/setup_db.py "postgresql+psycopg://postgres:YOURPASSWORD@localhost:5432/memory_lane"
"""
import re
import secrets
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
ENV = ROOT / ".env"


def ensure_env(database_url: str | None) -> None:
    """Create/update .env. The URL is passed in only once we know it works."""
    text = ENV.read_text() if ENV.exists() else (ROOT / ".env.example").read_text()
    if re.search(r"^JWT_SECRET=(change-me.*)?$", text, re.M):
        text = re.sub(r"^JWT_SECRET=.*$", f"JWT_SECRET={secrets.token_urlsafe(48)}", text, flags=re.M)
        print("• Generated a new JWT_SECRET")
    if database_url:
        text = re.sub(r"^DATABASE_URL=.*$", f"DATABASE_URL={database_url}", text, flags=re.M)
    ENV.write_text(text)
    print(f"• .env ready at {ENV}")


def main() -> None:
    from sqlalchemy import create_engine, text
    from sqlalchemy.engine import make_url
    from sqlalchemy.exc import OperationalError

    given = sys.argv[1] if len(sys.argv) > 1 else None
    ensure_env(None)  # make sure .env exists with a real JWT_SECRET

    if given:
        import os

        os.environ["DATABASE_URL"] = given  # takes priority over .env for this run

    from app.core.config import get_settings

    url = make_url(get_settings().database_url)
    if not url.drivername.startswith("postgresql"):
        sys.exit("DATABASE_URL must be a PostgreSQL URL (postgresql+psycopg://...).")
    dbname = url.database

    admin = create_engine(url.set(database="postgres"), isolation_level="AUTOCOMMIT")
    try:
        with admin.connect() as conn:
            exists = conn.execute(text("SELECT 1 FROM pg_database WHERE datname = :n"), {"n": dbname}).scalar()
            if exists:
                print(f"• Database '{dbname}' already exists")
            else:
                conn.execute(text(f'CREATE DATABASE "{dbname}"'))
                print(f"• Created database '{dbname}'")
    except OperationalError as e:
        msg = str(e.orig).strip().splitlines()[0] if e.orig else str(e)
        sys.exit(
            f"\nCouldn't connect to PostgreSQL: {msg}\n"
            "Check that PostgreSQL is running and that the username/password in DATABASE_URL are right.\n"
            'Re-run with your URL:  python scripts/setup_db.py "postgresql+psycopg://USER:PASSWORD@localhost:5432/memory_lane"'
        )

    if given:
        ensure_env(given)  # connection worked, so it is now safe to remember this URL

    from app.database.session import init_db

    init_db()
    print("• Tables created\n\nAll set. Start the API with:  uvicorn app.main:app --reload --port 8000")


if __name__ == "__main__":
    main()
