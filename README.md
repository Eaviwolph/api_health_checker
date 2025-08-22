# API Health Checker

A full-stack application for monitoring the health status of web endpoints in real-time.

## Features

- **Real-time monitoring** - Automatic health checks every 30 seconds
- **REST API** - Complete CRUD operations for endpoint management
    - TODO: Missing PATCH method for partial updates
- **React Frontend** - UI for managing and viewing endpoints
- **Docker Ready** - Full containerization support
    - TODO: Missing PROD docker configuration
- **Health History** - Track endpoint status over time

## Quick Start

```bash
# Clone repository
git clone git@github.com:Eaviwolph/api_health_checker.git
cd api_health_checker

# Frontend needs .env to reference Backend API
# If you do not do not have specic hosting changes, just copy the template
# cp frontend/.env.template frontend/.env

# Start with Docker
docker compose up

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
```

## Project Structure

```
api_health_checker/
├── backend/           # Django REST API
├── frontend/          # React application
├── docker-compose.yml # Container orchestration
└── README.md
```

## Documentation

- **Backend API**: See [`backend/README.md`](./backend/README.md)
- **Frontend**: See [`frontend/README.md`](./frontend/README.md)

## Tech Stack

**Backend**: Django 4.2, SQLite, Python 3.11  
**Frontend**: React Router, TypeScript, Vite, TailwindCSS  
**Deployment**: Docker, Docker Compose
