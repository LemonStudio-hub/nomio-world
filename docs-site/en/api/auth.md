# Authentication API

## Register Account

Register a new user.

### Request

```
POST /auth/register
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| username | string | ✅ | Username |
| password | string | ✅ | Password |

### Example

```bash
curl -X POST https://nomio-api.pages.dev/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "alice",
      "hasDomain": false,
      "hasEmail": false
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": 409,
    "message": "Username already exists"
  }
}
```

## Login

User login.

### Request

```
POST /auth/login
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| username | string | ✅ | Username |
| password | string | ✅ | Password |

### Example

```bash
curl -X POST https://nomio-api.pages.dev/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "alice",
      "hasDomain": true,
      "hasEmail": true
    }
  }
}
```

## Logout

User logout.

### Request

```
POST /auth/logout
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl -X POST https://nomio-api.pages.dev/auth/logout \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true
}
```

## Get User Info

Get detailed information of current logged-in user.

### Request

```
GET /auth/me
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl https://nomio-api.pages.dev/auth/me \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true,
  "data": {
    "username": "alice",
    "origin_url": "https://myapp.vercel.app",
    "origin_host": "",
    "forward_email": "alice@gmail.com",
    "email_enabled": true,
    "status": "active",
    "verify_status": "verified",
    "has_domain": true,
    "has_email": true,
    "created_at": "2024-01-01T00:00:00Z",
    "last_login_at": "2024-01-15T12:00:00Z",
    "total_mail_size": 1048576
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| username | string | Username |
| origin_url | string | Origin URL |
| origin_host | string | Origin Host |
| forward_email | string | Forward email |
| email_enabled | boolean | Email enabled |
| status | string | Account status |
| verify_status | string | Verify status |
| has_domain | boolean | Has domain |
| has_email | boolean | Has email |
| created_at | string | Created time |
| last_login_at | string | Last login time |
| total_mail_size | number | Total mail size (bytes) |
