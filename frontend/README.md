# FlowOps – Frontend

React application that provides a **Login** page and a protected **Welcome** page.  
It authenticates users against the [JWT Auth API backend](../backend/README.md) and stores the session tokens in `sessionStorage`.

---

## Tech stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite | Dev server & bundler |
| React Router v7 | Client-side routing |
| sessionStorage | Token storage (cleared on tab close) |

---

## Pages

### `/login`
- Displays a username / password form.
- On submit, calls `POST /login` on the backend.
- On success, stores `access_token` and `refresh_token` in `sessionStorage` and redirects to `/welcome`.
- Shows an inline error message on wrong credentials.

### `/welcome` (protected)
- Displays a welcome screen with session details.
- Unauthenticated users are automatically redirected to `/login`.
- Contains a **Sign out** button that clears the session and returns to `/login`.

---

## Design system

The UI follows the **FlowOps – Surgical Precision** design standard defined in [`/DESIGN.md`](../DESIGN.md):

- **Font:** Inter (300, 500 weights)
- **Colors:** Primary `#111827`, surface `#E5E7EB`, text-primary `#6B7280`
- **Cards:** Glassmorphism surfaces (`rgba(255,255,255,0.92)`, `backdrop-filter: blur(12px)`, radius `16px`/`32px`)
- **Buttons:** Pill shape (`border-radius: 9999px`), solid primary background `#111827`
- **Spacing:** 4px base rhythm

---

## Running locally (development)

### Prerequisites

- Node.js ≥ 18
- The backend running on `http://localhost:8000` (see [`../backend/README.md`](../backend/README.md))

### Steps

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Start the dev server (proxies /api → http://localhost:8000)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Default credentials** (from the backend):

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

---

## Running with Docker Compose (recommended)

From the repository root, this command starts both the backend and the frontend:

```bash
docker-compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | <http://localhost:3000> |
| Backend API | <http://localhost:8000> |

---

## Building for production

```bash
npm run build
```

The optimised output is written to `dist/`. Serve it with any static-file server.  
Set the environment variable `VITE_API_URL` to point at the backend when the origin differs:

```bash
VITE_API_URL=https://api.example.com npm run build
```

---

## Project structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   └── PrivateRoute.jsx   # Guards authenticated routes
│   ├── pages/
│   │   ├── Login.jsx          # Login page
│   │   └── Welcome.jsx        # Protected welcome page
│   ├── services/
│   │   └── auth.js            # API calls + sessionStorage helpers
│   ├── App.jsx                # Router setup
│   ├── main.jsx               # Entry point
│   └── index.css              # Design-system CSS variables
├── .env.example         # Environment variable reference
├── Dockerfile           # Production Docker image (nginx)
├── index.html
├── package.json
└── vite.config.js       # Vite config with /api proxy
```

---

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | *(empty – uses `/api` proxy)* | Full backend URL for production builds |

Copy `.env.example` to `.env` and adjust as needed.
