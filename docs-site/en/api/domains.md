# Domains API

## Get Domain Info

Get current user's domain information.

### Request

```
GET /domains
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl https://nomio-api.pages.dev/domains \
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
    "verify_status": "verified",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| username | string | Username |
| origin_url | string | Origin URL |
| origin_host | string | Origin Host |
| verify_status | string | Verify status |
| created_at | string | Created time |

## Register Domain

Register subdomain.

### Request

```
POST /domains/register
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| originUrl | string | ✅ | Origin URL |
| originHost | string | ❌ | Origin Host |

### Example

```bash
curl -X POST https://nomio-api.pages.dev/domains/register \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "originUrl": "https://myapp.vercel.app",
    "originHost": ""
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "originUrl": "https://myapp.vercel.app",
    "originHost": "",
    "verifyToken": "abc123def456",
    "verifyStatus": "pending"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": 409,
    "message": "Domain already registered"
  }
}
```

## Update Domain

Update domain configuration.

### Request

```
PUT /domains
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| originUrl | string | ✅ | Origin URL |
| originHost | string | ❌ | Origin Host |

### Example

```bash
curl -X PUT https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "originUrl": "https://new-origin.vercel.app",
    "originHost": "example.com"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "originUrl": "https://new-origin.vercel.app",
    "originHost": "example.com",
    "verifyStatus": "pending"
  }
}
```

## Delete Domain

Delete domain.

### Request

```
DELETE /domains
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl -X DELETE https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true
}
```

## Verify Origin

Verify origin ownership.

### Request

```
POST /domains/verify
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl -X POST https://nomio-api.pages.dev/domains/verify \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true,
  "data": {
    "verifyStatus": "verified"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "Verification failed"
  }
}
```

## Verify Status

| Status | Description |
|--------|-------------|
| pending | Pending verification |
| verified | Verified |
| failed | Verification failed |
