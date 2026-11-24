"""Central settings. All secrets come from environment variables (.env in development)."""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "development"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/memory_lane"
    jwt_secret: str = "dev-only-secret-change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    frontend_origin: str = "http://localhost:5173"
    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    # Hosts like Render hand out "postgres://..." or "postgresql://..."; our driver is psycopg 3.
    for prefix in ("postgres://", "postgresql://"):
        if settings.database_url.startswith(prefix):
            settings.database_url = "postgresql+psycopg://" + settings.database_url[len(prefix):]
    if settings.app_env == "production" and settings.jwt_secret.startswith(("dev-only", "change-me")):
        raise RuntimeError("Set a strong JWT_SECRET before running in production.")
    return settings
