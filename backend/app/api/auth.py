from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token
from app.database.session import get_db
from app.schemas.user import TokenResponse, UserCreate, UserLogin, UserRead
from app.services import user_service

router = APIRouter(prefix="/auth", tags=["auth"])


def _token_for(user) -> TokenResponse:
    return TokenResponse(access_token=create_access_token(user.id), user=UserRead.model_validate(user))


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(data: UserCreate, db: Session = Depends(get_db)):
    try:
        user = user_service.create_user(db, data)
    except user_service.EmailTakenError:
        raise HTTPException(status.HTTP_409_CONFLICT, "An account with that email already exists.")
    return _token_for(user)


@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = user_service.authenticate(db, data.email, data.password)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "That email and password don't match.")
    return _token_for(user)
