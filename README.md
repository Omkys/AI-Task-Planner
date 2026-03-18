# AI Goal Planner - PostgreSQL Version

Production-ready full-stack application with AI-powered goal planning.

## ✅ Setup Complete

- ✓ PostgreSQL database configured
- ✓ Prisma ORM integrated
- ✓ Database migrations applied
- ✓ Frontend/Backend aligned
- ✓ All dependencies installed

## 🚀 Quick Start

### Prerequisites
- PostgreSQL running on localhost:5432
- Database: `ai_planner`
- User: `postgres` / Password: `onkar1708`

### Start Application

**Option 1: Automatic**
```bash
start.bat
```

**Option 2: Manual**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📊 Database Schema

- **User** - Authentication
- **Goal** - Goal tracking with timeline
- **Milestone** - Goal phases
- **Task** - Daily actionable items
- **DailyReview** - User feedback

## 🔧 Environment Variables

`backend/.env`:
```
PORT=5000
DATABASE_URL="postgresql://postgres:onkar1708@localhost:5432/ai_planner"
JWT_SECRET=a8f5e2c9b4d7a1e6f3c8b5d2a9e7f4c1b8d5e2a9f6c3b0d7e4a1f8c5b2d9e6a3
GEMINI_API_KEY=AIzaSyDotGqA3tXJF7L8FfMqTSshHPfv8vGAPL0
```

## 🎯 Features

- AI-powered goal planning (Gemini API)
- Dynamic timeline adjustment
- Progress tracking & analytics
- Daily reviews with AI insights
- Secure JWT authentication
- PostgreSQL with Prisma ORM

## 📝 Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# View database
npx prisma studio

# Reset database
npx prisma migrate reset
```

## 🔐 Security

- JWT tokens (7-day expiry)
- bcrypt password hashing
- Rate limiting
- Input validation (Zod)
- CORS & Helmet

## 🎨 Tech Stack

**Backend**: Node.js, Express, Prisma, PostgreSQL  
**Frontend**: React, Vite, Tailwind CSS  
**AI**: Google Gemini API  
**Auth**: JWT, bcrypt
