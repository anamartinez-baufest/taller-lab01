from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.config import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    ALGORITHM,
    REFRESH_TOKEN_EXPIRE_SECONDS,
    SECRET_KEY,
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory user store (single admin user)
USERS = {
    "admin": pwd_context.hash("admin123"),
}


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str) -> bool:
    hashed = USERS.get(username)
    if not hashed:
        return False
    return verify_password(password, hashed)


def _create_token(data: dict, expires_in: int) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(seconds=expires_in)
    payload.update({"exp": expire})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(username: str) -> str:
    return _create_token(
        {"sub": username, "type": "access"}, ACCESS_TOKEN_EXPIRE_SECONDS
    )


def create_refresh_token(username: str) -> str:
    return _create_token(
        {"sub": username, "type": "refresh"}, REFRESH_TOKEN_EXPIRE_SECONDS
    )


def decode_refresh_token(token: str) -> Optional[str]:
    """Decode a refresh token and return the username, or None if invalid."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            return None
        username: Optional[str] = payload.get("sub")
        return username
    except JWTError:
        return None
