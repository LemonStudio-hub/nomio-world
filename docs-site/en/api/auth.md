# Authentication API

## Register Account

Register a new user.

### Request

```
POST /api/auth/register
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| username | string | ✅ | Username (3-32 chars, lowercase, numbers, hyphens) |
| password | string | ✅ | Password (8-128 chars) |

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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| token | string | JWT Token (valid for 24 hours) |
| user.username | string | Username |
| user.hasDomain | boolean | Has domain registered |
| user.hasEmail | boolean | Has email registered |

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "USERNAME_TAKEN",
    "message": "Username already taken"
  }
}
```

### Rate Limit

- 3 requests per hour per IP

## Login

User login.

### Request

```
POST /api/auth/login
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

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid username or password"
  }
}
```

### Rate Limit

- 5 requests per minute per IP

## Logout

User logout.

### Request

```
POST /api/auth/logout
```

### Example

```bash
curl -X POST https://nomio-api.pages.dev/auth/logout \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Logged out"
  }
}
```

::: tip Note
Logout endpoint is a semantic placeholder, actual logout requires client to clear token.
:::

## Get User Info

Get detailed information of current logged-in user.

### Request

```
GET /api/auth/me
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
    "origin_host": "myapp.vercel.app",
    "has_domain": true,
    "has_email": true,
    "forward_email": "alice@gmail.com",
    "email_enabled": true,
    "status": "active",
    "verify_status": "verified",
    "created_at": "2026-01-01T00:00:00Z",
    "last_login_at": "2026-01-15T12:00:00Z",
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
| has_domain | boolean | Has domain registered |
| has_email | boolean | Has email registered |
| forward_email | string | Forward email |
| email_enabled | boolean | Email enabled |
| status | string | Account status |
| verify_status | string | Verify status |
| created_at | string | Created time |
| last_login_at | string | Last login time |
| total_mail_size | number | Total mail size (bytes) |

## Username Rules

- Length: 3-32 characters
- Allowed characters: lowercase letters, numbers, hyphens
- Cannot start or end with hyphen
- Cannot contain consecutive hyphens
- Cannot use reserved words (admin, api, www, etc.)

## Security Notes

- Passwords are hashed using PBKDF2 (SHA-256, 100,000 iterations)
- JWT Token is valid for 24 hours
- Login and register have rate limit protection
