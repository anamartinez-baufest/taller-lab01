# JWT Auth API – Backend

FastAPI service that issues and refreshes **JWT tokens**.

## Tech stack

| Tool | Purpose |
|------|---------|
| Python 3.11 | Runtime |
| FastAPI | Web framework |
| python-jose | JWT encoding/decoding |
| passlib (bcrypt) | Password hashing |
| Poetry | Dependency management |
| Docker / docker-compose | Deployment |

---

## Endpoints

### `POST /login`

Authenticate with username and password. Returns an **access token** (valid 300 s) and a **refresh token** (valid 7 days).

**Request body (JSON)**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Successful response (200)**

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>",
  "token_type": "bearer"
}
```

**Error response (401)** – wrong credentials.

---

### `POST /refresh`

Exchange a valid refresh token for a new access token.

**Request body (JSON)**

```json
{
  "refresh_token": "<jwt>"
}
```

**Successful response (200)**

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}
```

**Error response (401)** – invalid or expired refresh token.

---

## Running locally with Docker Compose

> Requires Docker and Docker Compose installed.

```bash
# From the repository root
docker-compose up --build
```

The API will be available at <http://localhost:8000>.

Interactive documentation (Swagger UI) is available at <http://localhost:8000/docs>.

---

## Running locally without Docker

### Prerequisites

- Python 3.11+
- [Poetry](https://python-poetry.org/docs/#installation)

### Steps

```bash
cd backend

# Install dependencies
poetry install

# Start the development server
poetry run uvicorn app.main:app --reload
```

The API will be available at <http://localhost:8000>.

---

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | `changeme-supersecret-key-for-dev-only` | Secret used to sign JWT tokens. **Change in production!** |

---

## Example usage with curl

```bash
# 1. Login and capture tokens
RESPONSE=$(curl -s -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}')

ACCESS_TOKEN=$(echo $RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")
REFRESH_TOKEN=$(echo $RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['refresh_token'])")

# 2. Refresh the access token
curl -s -X POST http://localhost:8000/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\": \"$REFRESH_TOKEN\"}"
```
