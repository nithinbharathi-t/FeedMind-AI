# FeedMind AI

AI-powered survey and feedback platform built with React + Express.js + MongoDB.

## Project Structure

```
FeedMindAI/
├── frontend/          # React + Vite (UI)
│   ├── src/
│   │   ├── components/    # Sidebar, AuthOverlay
│   │   ├── pages/         # Dashboard, Forms, Responses, Analytics, FormBuilder, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js     # Proxies /api → backend:5000
│
├── backend/           # Express.js REST API
│   ├── config/        # DB connection
│   ├── controllers/   # Business logic
│   ├── middleware/    # JWT auth
│   ├── models/        # Mongoose models (User, Form, Response)
│   ├── routes/        # API route definitions
│   ├── uploads/       # Uploaded files (gitignored)
│   └── server.js      # Entry point
│
└── package.json       # Root workspace scripts
```

## Quick Start

### 1. Install Dependencies
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### 2. Configure Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.
```

### 3. Run Development Servers

**Frontend** (http://localhost:5173):
```bash
cd frontend
npm run dev
```

**Backend** (http://localhost:5000):
```bash
cd backend
npm run dev
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| POST | `/api/auth/google` | Google OAuth | ❌ |
| GET | `/api/auth/me` | Get profile | ✅ |
| GET | `/api/forms` | List forms | ✅ |
| POST | `/api/forms` | Create form | ✅ |
| GET | `/api/forms/:id` | Get form | ✅ |
| PUT | `/api/forms/:id` | Update form | ✅ |
| DELETE | `/api/forms/:id` | Delete form | ✅ |
| PATCH | `/api/forms/:id/publish` | Publish form | ✅ |
| GET | `/api/forms/share/:link` | Public form | ❌ |
| POST | `/api/responses/submit` | Submit response | ❌ |
| GET | `/api/responses` | List responses | ✅ |
| GET | `/api/responses/export` | Export CSV | ✅ |
| GET | `/api/analytics/overview` | Dashboard stats | ✅ |
| GET | `/api/analytics/trends` | Response trends | ✅ |
| POST | `/api/upload` | Upload data file | ✅ |
| POST | `/api/ocr` | Upload for OCR | ✅ |

## Tech Stack
- **Frontend**: React 19, Vite, CSS Variables
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Multer
