# API Health Checker - Backend

A Django REST API for monitoring the health status of web endpoints. This backend service allows you to add, monitor, and track the health of various HTTP endpoints.

## Features

- **CRUD Operations** for endpoint management
    - What's left TODO:
        - Implement PATCH method for partial updates
        - Improve error handling and validation
        - RESTful API design principles to be improved (By using Django REST Framework)
- **Automated Health Monitoring** with background cron jobs
- **Health Check History** tracking

## Tech Stack

- **Framework**: Django 4.2
- **Database**: SQLite (configurable)
- **HTTP Client**: Requests

## Data Models

### Endpoint
```json
{
  "id": "uuid",
  "name": "string",
  "url": "string",
  "method": "GET|POST",
  "expected_status": "integer",
  "last_check": "datetime",
  "last_status": "integer",
  "last_response_time": "duration",
  "is_healthy": "boolean"
}
```

### HealthCheck
```json
{
  "id": "uuid",
  "endpoint": "uuid",
  "timestamp": "datetime",
  "status": "integer",
  "response_time": "duration"
}
```

## Manual installation (Not recommended)

### Prerequisites
- Python 3.11+
- pip

1. **Navigate to the backend directory**
   ```bash
   cd api_health_checker/backend
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations**
   ```bash
   python manage.py migrate
   ```

4. **Start the development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`

## Docker Setup

```bash
docker compose up --build
```

## Usage Examples

### List all endpoints monitored
```bash
curl http://localhost:8000/api/endpoints/
```

### Create a new endpoint
```bash
curl -X POST http://localhost:8000/api/endpoints/ \
  -d '{
    "name": "API Production",
    "url": "https://api.example.com/health",
    "method": "GET",
    "expected_status": 200
  }'
```

### Delete an endpoint
```bash
curl -X DELETE http://localhost:8000/api/endpoints/{endpoint-id}/
```

### Get a specific endpoint
```bash
curl http://localhost:8000/api/endpoints/{endpoint-id}/
```

### Trigger health check
```bash
curl http://localhost:8000/api/endpoints/{endpoint-id}/check/
```

### Get last 10 health checks
```bash
curl http://localhost:8000/api/endpoints/{endpoint-id}/history/
```

## Configuration

Cron task is configurable via the `settings.py` file.

Default:
```python
CRON_TASK_MAX_WORKERS = 5
# Time in seconds between each cron job execution
CRON_TASK_WAIT_TIME = 30
```
