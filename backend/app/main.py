from fastapi import FastAPI, HTTPException, status

from app.auth import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from app.models import AccessTokenResponse, LoginRequest, RefreshRequest, TokenResponse

app = FastAPI(
    title="JWT Auth API",
    description="FastAPI service that issues and refreshes JWT tokens.",
    version="0.1.0",
)


@app.post("/login", response_model=TokenResponse, summary="Authenticate and get tokens")
def login(body: LoginRequest):
    """
    Authenticate with **username** and **password**.

    Returns an access token (expires in 300 s) and a refresh token.
    """
    if not authenticate_user(body.username, body.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return TokenResponse(
        access_token=create_access_token(body.username),
        refresh_token=create_refresh_token(body.username),
    )


@app.post(
    "/refresh",
    response_model=AccessTokenResponse,
    summary="Refresh the access token",
)
def refresh(body: RefreshRequest):
    """
    Provide a valid **refresh_token** to obtain a new access token.
    """
    username = decode_refresh_token(body.refresh_token)
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return AccessTokenResponse(access_token=create_access_token(username))
