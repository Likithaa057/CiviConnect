# CiviConnect Backend API

Base URL (local): `http://127.0.0.1:8001/api/`

## Authentication
Login returns an `access` token. Send it with every complaint request:

    Authorization: Bearer <access_token>

## Auth endpoints

### Register
POST `/api/auth/register/`

    {
      "username": "citizen1",
      "email": "citizen1@test.com",
      "password": "test1234",
      "role": "citizen",
      "phone": "9999999999"
    }

Roles allowed at signup: `citizen`, `worker`, `ngo` (`admin` is blocked).

### Login
POST `/api/auth/login/`

    { "username": "citizen1", "password": "test1234" }

Response: `{ "access": "...", "refresh": "..." }`

### Refresh token
POST `/api/auth/token/refresh/`

    { "refresh": "<refresh_token>" }

## Complaint endpoints (token required)

### Submit a complaint
POST `/api/complaints/`

    {
      "title": "Garbage not collected",
      "description": "Garbage pile near the bus stop for 5 days",
      "category": "garbage",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "image_url": ""
    }

Categories: `garbage`, `water`, `electricity`, `road`, `streetlight`, `other`

### List complaints
GET `/api/complaints/`
- citizen: only their own complaints
- worker, ngo, admin: all complaints

### Get one complaint (tracking page)
GET `/api/complaints/<id>/`

### Update status (worker, ngo, admin only)
PATCH `/api/complaints/<id>/status/`

    { "status": "in_progress" }

Statuses: `pending`, `assigned`, `in_progress`, `resolved`

## Complaint object

    {
      "id": 1,
      "username": "citizen1",
      "title": "...",
      "description": "...",
      "category": "garbage",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "image_url": "",
      "status": "pending",
      "user": 2,
      "assigned_to": null,
      "created_at": "...",
      "updated_at": "..."
    }

## Run locally
1. Install PostgreSQL, create DB `civiconnect`
2. Copy `.env.example` to `.env` and fill in values
3. `pip install -r requirements.txt`
4. `python manage.py migrate`
5. `python manage.py runserver 8001`