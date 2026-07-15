# API Overview

Nomio.World provides RESTful API for managing domains and emails.

## API URL

```
https://nomio-api.pages.dev
```

## Authentication

Use JWT Token for authentication:

```bash
Authorization: Bearer <your-token>
```

JWT Token is valid for **24 hours**, after which you need to login again.

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register account | ❌ |
| POST | /auth/login | Login | ❌ |
| POST | /auth/logout | Logout | ❌ |
| GET | /auth/me | Get user info | ✅ |

### Domains

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /domains | Get domain info | ✅ |
| POST | /domains/register | Register domain | ✅ |
| PUT | /domains | Update domain | ✅ |
| DELETE | /domains | Delete domain | ✅ |
| POST | /domains/verify | Verify origin | ✅ |

### Mails

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /mails | Get mail list | ✅ |
| GET | /mails/stats | Get mail statistics | ✅ |
| GET | /mails/:id | Get mail detail | ✅ |
| POST | /mails/register | Register email | ✅ |
| PUT | /mails/:id/read | Mark as read | ✅ |
| PUT | /mails/:id/unread | Mark as unread | ✅ |
| PUT | /mails/:id/star | Toggle star | ✅ |
| DELETE | /mails/:id | Delete mail | ✅ |
| DELETE | /mails | Batch delete | ✅ |
| PUT | /mails/read | Batch mark read | ✅ |
| PUT | /mails/unread | Batch mark unread | ✅ |

### Settings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /settings/email | Get email settings | ✅ |
| PUT | /settings/email | Update email settings | ✅ |

### Health Check

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /health | Health check | ❌ |

## Request Examples

### Register Account

```bash
curl -X POST https://nomio-api.pages.dev/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST https://nomio-api.pages.dev/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

### Get Domain Info

```bash
curl https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>"
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

## Error Codes

| Error Code | Description |
|------------|-------------|
| UNAUTHORIZED | Not authenticated |
| INVALID_TOKEN | Invalid token |
| TOKEN_EXPIRED | Token expired |
| RATE_LIMITED | Too many requests |
| INVALID_INPUT | Invalid input |
| INVALID_JSON | Invalid JSON format |
| NOT_FOUND | Resource not found |
| CONFLICT | Resource conflict |
| USERNAME_TAKEN | Username already taken |
| VERIFY_FAILED | Verification failed |
| INTERNAL_ERROR | Internal server error |

## Rate Limiting

API has rate limits, exceeding limits returns 429 status code:

| Endpoint | Limit | Window |
|----------|-------|--------|
| Login | 5 requests | 1 minute |
| Register | 3 requests | 1 hour |
| API | 60 requests | 1 minute |
| Email | 10 requests | 1 hour |

Response headers include rate limit information:
- `X-RateLimit-Limit`: Maximum requests
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset time

## Security Headers

All API responses include security headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Next Steps

- [Authentication API](/en/api/auth) - Learn about authentication endpoints
- [Domains API](/en/api/domains) - Learn about domain endpoints
- [Mails API](/en/api/mails) - Learn about mail endpoints
- [Settings API](/en/api/settings) - Learn about settings endpoints
