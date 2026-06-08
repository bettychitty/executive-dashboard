# Executive Dashboard - Full Stack Setup

Complete setup for the Executive Function Dashboard with FastAPI backend and React frontend.

## Quick Start

### Backend Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run server (port 8000)
python run.py
```

API docs: http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run dev server (port 5173)
npm run dev
```

Frontend: http://localhost:5173

## Architecture

### Backend (FastAPI)
- SQLite database
- REST API with task management, source ingestion, and notebook validation
- Rule-based task extraction from emails/Teams messages
- No ORM - direct SQL queries for simplicity

### Frontend (React)
- Component-based UI with Tailwind CSS
- Real-time state management with hooks
- Optimistic UI updates
- Responsive design for all devices

## Key Endpoints

### Tasks
```
POST   /api/tasks                 Create task
GET    /api/tasks                 List all tasks
PATCH  /api/tasks/{id}            Update task status
```

### Source Items
```
POST   /api/import/source-item    Import email/Teams message
GET    /api/source-items          List all source items
POST   /api/source-items/{id}/state   Update item state
```

### Suggestions
```
GET    /api/import/suggestions                    List pending suggestions
POST   /api/import/suggestions/{id}/approve       Convert suggestion to task
POST   /api/import/suggestions/{id}/dismiss       Dismiss suggestion
```

## System Architecture

```
User
  ↓
React Frontend (Vite)
  ↓ (HTTP/JSON)
FastAPI Backend (Port 8000)
  ↓
SQLite Database
  ↓
Tasks, Suggestions, Source Items
```

## Data Flow

1. **Message Import**
   - Email/Teams message imported via `POST /api/import/source-item`
   - Backend extracts potential tasks using rule-based NLP
   - Suggestions created automatically

2. **Suggestion Review**
   - Frontend shows suggestions to user
   - User approves → creates task
   - User dismisses → removes suggestion

3. **Task Management**
   - User creates manual task or approves suggestion
   - Task tracked with status (not_started → in_progress → done)
   - Urgent items highlighted in "Needs Attention" section

4. **Source Tracking**
   - Messages tracked through lifecycle (open → completed/dismissed)
   - Linked to extracted suggestions and created tasks

## Features

### Backend
✅ Task CRUD operations  
✅ Rule-based task extraction (strong/soft signals, deadlines)  
✅ Email/Teams message ingestion  
✅ Suggestion approval workflow  
✅ Notebook validation with governance checks  
✅ SQLite persistence  

### Frontend
✅ Real-time task management  
✅ Quick task creation (modal with Enter key)  
✅ Visual priority/status indicators  
✅ Search and filter tasks  
✅ Suggestion review and approval  
✅ Message state tracking  
✅ Responsive design  
✅ Optimistic UI updates  

## Development

### Adding Features

1. **Backend**: Add endpoint in `app/main.py`, add logic in `app/tasks.py` or equivalent
2. **Frontend**: Add component in `frontend/src/components/`, update `App.jsx` state

### Testing Backend

```bash
# Interactive API docs
curl http://localhost:8000/docs

# Create task
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "source": "manual", "priority": "high"}'
```

### Testing Frontend

```bash
cd frontend
npm run dev
# Open http://localhost:5173
```

## Database

SQLite database is created automatically at `executive_dashboard.db`

Tables:
- `tasks` - Task items
- `source_items` - Imported emails/Teams messages
- `task_suggestions` - Extracted task suggestions
- `notebook_check_runs` - Notebook validation runs
- `notebook_findings` - Notebook validation results

## Environment Variables

### Backend
- `DATABASE_URL` - SQLite path (default: ./executive_dashboard.db)

### Frontend
- `VITE_API_BASE` - API base URL (default: http://localhost:8000)

## Deployment

### Backend (Render, Heroku, etc.)
```bash
# Production run with gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

### Frontend (Vercel, Netlify, etc.)
```bash
npm run build
# Deploy dist/ folder
```

## License

MIT
