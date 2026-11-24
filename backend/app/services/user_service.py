"""Business rules for users. Routes stay thin; the logic lives here."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class EmailTakenError(Exception):
    pass


class WrongPasswordError(Exception):
    pass


def get_by_email(db: Session, email: str) -> User | None:
    return db.scalar(select(User).where(User.email == email.lower()))


def create_user(db: Session, data: UserCreate) -> User:
    if get_by_email(db, data.email):
        raise EmailTakenError
    user = User(email=data.email, display_name=data.display_name, hashed_password=hash_password(data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# A real hash of a throwaway string. Verifying against it when the email is unknown
# keeps response time similar, so attackers can't tell which emails are registered.
_DUMMY_HASH = hash_password("not-a-real-password")


def authenticate(db: Session, email: str, password: str) -> User | None:
    user = get_by_email(db, email)
    if user is None:
        verify_password(password, _DUMMY_HASH)
        return None
    return user if verify_password(password, user.hashed_password) else None


def update_profile(db: Session, user: User, data: UserUpdate) -> User:
    for field, value in data.model_dump(exclude_unset=True).items():
        if field == "display_name" and value is None:
            continue  # display name is required; ignore attempts to blank it
        setattr(user, field, value)
    db.commit()
    db.refresh(user)
    return user


def change_password(db: Session, user: User, current: str, new: str) -> None:
    if not verify_password(current, user.hashed_password):
        raise WrongPasswordError
    user.hashed_password = hash_password(new)
    db.commit()
